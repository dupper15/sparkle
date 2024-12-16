import { useEffect, useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { useDarkMode } from "../../contexts/DarkModeContext";
import axios from "axios";
import { removeAndPopComponentFromCanvas } from "../../services/utils/componentOrchestrator.js";
import ComponentService from "../../services/ComponentService.js";
import socket from "../../utils/socket";
import { useSelector } from "react-redux";
import { throttle } from "lodash";

const useCanvasViewModel = (id, databaseId) => {
  const [isImageToolBarOpen, setOpenImageToolBar] = useState(false);
  const [isTextToolBarOpen, setOpenTextToolBar] = useState(false);
  const [shapes, setShapes] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const canvasRef = useRef(null);
  const { isOver, setNodeRef } = useDroppable({ id });
  const { isDarkMode } = useDarkMode();
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const [focuses, setFocuses] = useState({});
  const [cursors, setCursors] = useState({});
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/canvas/get-components/${databaseId}`
        );
        setShapes(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch components:", error);
      }
    };
    fetchComponents();
    document.addEventListener(`update-shapes-${id}`, fetchComponents);
    return () => {
      document.removeEventListener(`update-shapes-${id}`, fetchComponents);
    };
  }, [databaseId, id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.shiftKey) {
        return; // Ignore clicks when the shift key is pressed
      }
      if (canvasRef.current) {
        const isInsideComponent = selectedComponents.some((componentId) => {
          const componentElement = document.getElementById(`${componentId}`);
          return componentElement && componentElement.contains(event.target);
        });

        const toolbars = document.querySelectorAll(
          ".toolbar, .color-picker-panel"
        );
        const isClickInsideToolbar = Array.from(toolbars).some((toolbar) =>
          toolbar.contains(event.target)
        );

        if (!isInsideComponent && !isClickInsideToolbar) {
          setOpenImageToolBar(false);
          setOpenTextToolBar(false);
          setSelectedComponents([]);
          selectedComponents.forEach((componentId) => {
            socket.emit("deselect-component", {
              componentId,
              userId,
              roomId: databaseId,
            });
          });
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedComponents, canvasRef]);

  useEffect(() => {
    const handleSelectUpdate = ({ id, userId1, userName }) => {
      setFocuses((prev) => {
        const newState = { ...prev };
        if (!newState[id]) {
          newState[id] = [];
        }
        if (!newState[id].find((user) => user.userId1 === userId1)) {
          newState[id].push({ userId1, userName });
        }
        return newState;
      });
    };

    const handleDeselectUpdate = ({ componentId, userId }) => {
      setFocuses((prev) => {
        const newState = { ...prev };
        if (newState[componentId]) {
          const filteredUsers = newState[componentId].filter(
            (user) => user.userId1 !== userId
          );
          if (filteredUsers.length > 0) {
            newState[componentId] = filteredUsers;
          } else {
            delete newState[componentId];
          }
        }
        return newState;
      });
    };

    socket.on("update-select-component", handleSelectUpdate);
    socket.on("update-deselect-component", handleDeselectUpdate);

    return () => {
      socket.off("update-select-component", handleSelectUpdate);
      socket.off("update-deselect-component", handleDeselectUpdate);
    };
  }, []);

  const handleColorChange = (color) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        selectedComponents.includes(shape._id) ? { ...shape, color } : shape
      )
    );
    selectedComponents.forEach((componentId) => {
      ComponentService.updateComponentColor("shape", color, componentId).then();
    });
  };
  socket.on("remove-cursor", ({ userId }) => {
    setCursors((prev) => {
      const newCursors = { ...prev };
      delete newCursors[userId];
      return newCursors;
    });
    console.log("ok");
  });
  useEffect(() => {
    socket.emit("join-page", databaseId);

    socket.on("update-cursor", ({ userId, x, y, userName, databaseId }) => {
      setCursors((prev) => ({
        ...prev,
        [userId]: { x, y, userName, databaseId },
      }));
    });

    return () => {
      socket.emit("leave-page", { databaseId });
      socket.off("update-cursor");
    };
  }, [databaseId]);
  const handleMouseMove = throttle((e) => {
    const rect = document.getElementById(id).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    socket.emit("mousemove", { databaseId, x, y });
  }, 100);
  const handleMouseLeave = () => {
    console.log("ok 1");
    socket.emit("leave-page", { databaseId });
  };

  const handleSelectComponent = (componentId, event) => {
    setSelectedComponents((prev) => {
      if (event.shiftKey) {
        if (!prev.includes(componentId)) {
          return [...prev, componentId];
        } else {
          return prev.filter((id) => id !== componentId);
        }
      } else {
        return [componentId];
      }
    });
    socket.emit("select-component", {
      id: componentId,
      userId1: userId,
      roomId: databaseId,
    });
  };

  const handleShapeClick = (shapeId, event) => {
    handleSelectComponent(shapeId, event);
    setOpenImageToolBar(true);
    setOpenTextToolBar(false);
  };

  const handleTextClick = (databaseId) => {
    setOpenTextToolBar(true);
    setOpenImageToolBar(false);
  };

  const removeComponent = async (componentId, componentType) => {
    try {
      await removeAndPopComponentFromCanvas(
        databaseId,
        componentType,
        componentId
      );
      setShapes((prevShapes) => {
        return prevShapes.filter((shape) => shape._id !== componentId);
      });
    } catch (error) {
      console.error("Failed to remove component:", error);
    }
  };
  const handleSendBackward = () => {
    console.log("Send Backward");
  };

  const handleSendToBack = () => {
    console.log("Send To Back");
  };

  const handleSendForward = () => {
    console.log("Send Forward");
  };

  const handleSendToFront = () => {
    console.log("Send To Front");
  };

  return {
    selectedComponents,
    isImageToolBarOpen,
    isTextToolBarOpen,
    canvasRef,
    isOver,
    setNodeRef,
    isDarkMode,
    handleShapeClick,
    handleTextClick,
    shapes,
    removeComponent,
    handleColorChange,
    handleSendBackward,
    handleSendToBack,
    handleSendForward,
    handleSendToFront,
    handleMouseMove,
    handleMouseLeave,
    cursors,
    focuses,
  };
};

export default useCanvasViewModel;
