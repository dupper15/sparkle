import { useEffect, useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { useDarkMode } from "../../contexts/DarkModeContext";
import axios from "axios";
import { removeAndPopComponentFromCanvas } from "../../services/utils/componentOrchestrator.js";
import ComponentService from "../../services/ComponentService.js";
import TextService from "../../services/TextService.js";
import socket from "../../utils/socket";
import { useSelector } from "react-redux";
import { throttle } from "lodash";
import debounce from "lodash.debounce";

const useCanvasViewModel = (id, databaseId) => {
  const [isImageToolBarOpen, setOpenImageToolBar] = useState(false);
  const [isTextToolBarOpen, setOpenTextToolBar] = useState(false);
  const [components, setComponents] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const canvasRef = useRef(null);
  const { isOver, setNodeRef } = useDroppable({ id });
  const { isDarkMode } = useDarkMode();
  const [selectedComponentColor, setSelectedComponentColor] =
    useState("#000000");
  const [selectedTextFontFamily, setSelectedTextFontFamily] = useState("");
  const [selectedTextFontSize, setSelectedTextFontSize] = useState(16);
  const [selectedTextFontWeight, setSelectedTextFontWeight] =
    useState("normal");
  const [selectedTextFontStyle, setSelectedTextFontStyle] = useState("normal");
  const [selectedTextDecorationLine, setSelectedTextDecorationLine] =
    useState("none");
  const [selectedTextTextAlign, setSelectedTextTextAlign] = useState("left");
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const room = useSelector((state) => state.project);
  const roomId = room.id;
  const [focuses, setFocuses] = useState({});
  const [cursors, setCursors] = useState({});
  // Fetch components from the database
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_KEY}/canvas/get-components/${databaseId}`
        );
        setComponents(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch components:", error);
      }
    };

    fetchComponents().then();

    const eventTypes = ["shapes", "texts"];
    eventTypes.forEach((type) => {
      document.addEventListener(`update-${type}-${id}`, fetchComponents);
    });

    return () => {
      eventTypes.forEach((type) => {
        document.removeEventListener(`update-${type}-${id}`, fetchComponents);
      });
    };
  }, [databaseId, id]);

  // Handle clicks outside the canvas
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.shiftKey) return;
      if (canvasRef.current) {
        const isInsideComponent = selectedComponents.some((componentId) => {
          const componentElement = document.getElementById(`${componentId}`);
          return componentElement && componentElement.contains(event.target);
        });
        const toolbars = document.querySelectorAll(
          ".toolbar, .color-picker-panel, .toolbar-item"
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
    const updateSelectedComponentProperty = (property, setState) => {
      const selectedGeneralComponents = components.filter((component) =>
        selectedComponents.includes(component._id)
      );
      if (selectedGeneralComponents.length === 0) {
        setState("");
        return;
      }
      const values = selectedGeneralComponents.map(
        (component) => component[property]
      );
      const uniqueValues = [...new Set(values)];
      setState(uniqueValues.length === 1 ? uniqueValues[0] : "");
    };
    updateSelectedComponentProperty("color", setSelectedComponentColor);
  }, [components, selectedComponents]);

  useEffect(() => {
    const updateSelectedTextProperty = (property, setState) => {
      const selectedTextComponents = components.filter(
        (component) =>
          selectedComponents.includes(component._id) &&
          component.type.toLowerCase() === "text"
      );
      if (selectedTextComponents.length === 0) {
        setState("");
        return;
      }
      const values = selectedTextComponents.map(
        (component) => component[property]
      );
      const uniqueValues = [...new Set(values)];
      setState(uniqueValues.length === 1 ? uniqueValues[0] : "");
    };

    updateSelectedTextProperty("fontFamily", setSelectedTextFontFamily);
    updateSelectedTextProperty("fontSize", setSelectedTextFontSize);
    updateSelectedTextProperty("fontWeight", setSelectedTextFontWeight);
    updateSelectedTextProperty("fontStyle", setSelectedTextFontStyle);
    updateSelectedTextProperty(
      "textDecorationLine",
      setSelectedTextDecorationLine
    );
    updateSelectedTextProperty("textAlign", setSelectedTextTextAlign);
  }, [components, selectedComponents]);
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
    socket.on("componentColorChanged", ({ componentId, color }) => {
      setComponents((prevComponents) =>
        prevComponents.map((component) =>
          component._id === componentId ? { ...component, color } : component
        )
      );
    });
    return () => {
      socket.off("update-select-component", handleSelectUpdate);
      socket.off("update-deselect-component", handleDeselectUpdate);
      socket.off("componentColorChanged");
    };
  }, []);

  // Update component helper function
  const updateComponent = (updateFn) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        selectedComponents.includes(component._id)
          ? updateFn(component)
          : component
      )
    );
  };

  // Handle component selection
  const handleSelectComponent = (componentId, event) => {
    const componentType = components.find(
      (component) => component._id === componentId
    )?.type;
    setSelectedComponents((prev) => {
      if (event.shiftKey) {
        const allSameType = prev.every(
          (id) =>
            components.find((component) => component._id === id)?.type ===
            componentType
        );
        if (allSameType) {
          return prev.includes(componentId)
            ? prev.filter((id) => id !== componentId)
            : [...prev, componentId];
        } else {
          return prev;
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

  // Handle shape click
  const handleShapeClick = (shapeId, event) => {
    handleSelectComponent(shapeId, event);
    setOpenImageToolBar(true);
    setOpenTextToolBar(false);
  };

  // Handle text click
  const handleTextClick = (textId, event) => {
    handleSelectComponent(textId, event);
    setOpenTextToolBar(true);
    setOpenImageToolBar(false);
  };

  // Handle color change
  const handleColorChange = (color) => {
    updateComponent((component) => {
      ComponentService.updateComponentColor(
        component.type,
        color,
        component._id
      ).then(() => {
        socket.emit("componentColorChanged", {
          componentId: component._id,
          color,
          roomId,
        });
      });
      return { ...component, color };
    });
  };

  const handleFontFamilyChange = (fontFamily) => {
    updateComponent((component) => {
      TextService.updateTextFontFamily(fontFamily, component._id).then();
      return { ...component, fontFamily };
    });
  };

  const handleFontSizeChange = (fontSize) => {
    updateComponent((component) => {
      TextService.updateTextFontSize(fontSize, component._id).then();
      return { ...component, fontSize };
    });
  };

  const handleFontWeightChange = (fontWeight) => {
    updateComponent((component) => {
      TextService.updateTextFontWeight(fontWeight, component._id).then();
      return { ...component, fontWeight };
    });
  };

  const handleFontStyleChange = (fontStyle) => {
    updateComponent((component) => {
      TextService.updateTextFontStyle(fontStyle, component._id).then();
      return { ...component, fontStyle };
    });
  };

  const handleTextDecorationLineChange = (textDecorationLine) => {
    updateComponent((component) => {
      TextService.updateTextDecorationLine(
        textDecorationLine,
        component._id
      ).then();
      return { ...component, textDecorationLine };
    });
  };

  const handleTextAlignChange = (textAlign) => {
    updateComponent((component) => {
      TextService.updateTextTextAlign(textAlign, component._id).then();
      return { ...component, textAlign };
    });
  };

  const handleTextContentChange = (content) => {
    updateComponent((component) => {
      TextService.updateTextContent(content, component._id).then();
      return { ...component, content };
    });
  };

  // Remove component
  const removeComponent = async (componentId, componentType) => {
    try {
      await removeAndPopComponentFromCanvas(
        databaseId,
        componentType,
        componentId
      );
      setComponents((prevComponents) =>
        prevComponents.filter((component) => component._id !== componentId)
      );
    } catch (error) {
      console.error("Failed to remove component:", error);
    }
  };

  // ZIndex helper functions
  const getNewZIndex = (component, change) => component.zIndex + change;

  const calculateNewZIndex = (component, change) => {
    if (change === 50 || change === 0) return change;
    if (
      (component.zIndex === 50 && change > 0) ||
      (component.zIndex === 0 && change < 0)
    )
      return component.zIndex;
    return getNewZIndex(component, change);
  };

  const updateComponentZIndex = (component, change) => {
    const newZIndex = calculateNewZIndex(component, change);
    ComponentService.updateComponentZIndex(
      component.type,
      newZIndex,
      component._id
    ).then();
    return { ...component, zIndex: newZIndex };
  };

  // Handle ZIndex change
  const handleChangeZIndex = (change) => {
    updateComponent((component) => updateComponentZIndex(component, change));
  };

  return {
    selectedComponentColor,
    selectedTextFontFamily,
    selectedTextFontSize,
    selectedTextFontWeight,
    selectedTextFontStyle,
    selectedTextDecorationLine,
    selectedTextTextAlign,
    selectedComponents,
    components,
    isImageToolBarOpen,
    isTextToolBarOpen,
    canvasRef,
    isOver,
    setNodeRef,
    isDarkMode,
    handleShapeClick,
    handleTextClick,
    removeComponent,
    handleColorChange,
    handleFontFamilyChange,
    handleFontSizeChange,
    handleFontWeightChange,
    handleFontStyleChange,
    handleTextDecorationLineChange,
    handleTextAlignChange,
    handleSendBackward: () => handleChangeZIndex(-1),
    handleSendToBack: () => handleChangeZIndex(0),
    handleSendForward: () => handleChangeZIndex(1),
    handleSendToFront: () => handleChangeZIndex(50),
    handleMouseMove,
    handleMouseLeave,
    cursors,
    focuses,
    handleTextContentChange,
  };
};

export default useCanvasViewModel;
