import { useState, useRef, useEffect } from "react";
import _ from "lodash";
import TextService from "../../services/TextService.js";
import socket from "../../utils/socket";
import { useSelector } from "react-redux";

const useTextComponentViewModel = (
  info,
  removeComponent,
  selectedComponents
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: info.x, y: info.y });
  const [size, setSize] = useState({ width: info.width, height: info.height });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [resizeStartPosition, setResizeStartPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isTransforming, setIsTransforming] = useState(false);
  const startTransformRef = useRef({ x: 0, y: 0, rotate: 0 });
  const [deg, setDeg] = useState(info.rotate || 0);
  const componentRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const isSelected = selectedComponents.includes(info._id);
  const inputRef = useRef(null);
  const project = useSelector((state) => state.project);
  const roomId = project.id;
  const [isTransformButtonPressed, setIsTransformButtonPressed] = useState(false);
  useRef(null);
  useEffect(() => {
    socket.on("updateText", (data) => {
      const { textId, x, y, width, height, rotate } = data;
      if (textId === info._id) {
        setPosition({ x, y });
        setSize({ width, height });
        setDeg(rotate);
      }
    });
    return () => {
      socket.off("shapeUpdated");
    };
  }, [info._id]);
  const updateTextInDatabase = useRef(
    _.debounce((updatedData) => {
      socket.emit("updateText", {
        roomId,
        textId: info._id,
        ...updatedData,
      });
      TextService.updateText(info._id, updatedData)
        .then(() => {})
        .catch((error) => {
          console.error("Failed to update text", error);
        });
    }, 500)
  ).current;

  const calculateTransform = (e, componentRef) => {
    const rect = componentRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return angle < 0 ? angle + 360 : angle;
  };

  const handleTransformMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isResizing) {
      setIsTransforming(true);
      setIsTransformButtonPressed(true);
      const initialAngle = calculateTransform(e, componentRef);
      startTransformRef.current = {
        x: e.clientX,
        y: e.clientY,
        rotate: deg - initialAngle,
      };
    }
  };

  const handleTransformMouseUp = () => {
    setIsTransforming(false);
    setIsTransformButtonPressed(false);
  };

  const handleTransformMouseMove = (e) => {
    if (isTransforming) {
      const angle = calculateTransform(e, componentRef);
      const newDeg = startTransformRef.current.rotate + angle;
      setDeg(newDeg);
      updateTextInDatabase({
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
        rotate: newDeg,
      });
    }
  };

  const handleMouseDown = (e) => {
    if (isEditing) return; // Prevent dragging when editing
    e.preventDefault();
    if (!isResizing) {
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
      updateTextInDatabase({ x: newX, y: newY });
    } else if (isResizing) {
      handleResizeMouseMove(e);
    } else if (isTransforming) {
      handleTransformMouseMove(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setIsTransforming(false);
    setResizeDirection(null);
    setIsTransformButtonPressed(false);
  };

  const handleResizeMouseDown = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleResizeMouseMove = (e) => {
    if (isResizing && resizeDirection) {
      const deltaX = e.clientX - resizeStartPosition.x;
      const deltaY = e.clientY - resizeStartPosition.y;
      let newWidth = size.width;
      let newHeight = size.height;
      let newX = position.x;
      let newY = position.y;
      switch (resizeDirection) {
        case "top-left":
          newWidth = size.width - deltaX;
          newHeight = size.height - deltaY;
          newX = position.x + deltaX;
          newY = position.y + deltaY;
          break;
        case "top-right":
          newWidth = size.width + deltaX;
          newHeight = size.height - deltaY;
          newY = position.y + deltaY;
          break;
        case "bottom-left":
          newWidth = size.width - deltaX;
          newHeight = size.height + deltaY;
          newX = position.x + deltaX;
          break;
        case "bottom-right":
          newWidth = size.width + deltaX;
          newHeight = size.height + deltaY;
          break;
        case "top":
          newHeight = size.height - deltaY;
          newY = position.y + deltaY;
          break;
        case "bottom":
          newHeight = size.height + deltaY;
          break;
        case "left":
          newWidth = size.width - deltaX;
          newX = position.x + deltaX;
          break;
        case "right":
          newWidth = size.width + deltaX;
          break;
        default:
          break;
      }
      newWidth = Math.max(10, newWidth);
      newHeight = Math.max(10, newHeight);
      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
      updateTextInDatabase({
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    }
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing || isTransforming) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mouseleave", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, isResizing, isTransforming]);

  useEffect(() => {
    if (isTransforming) {
      document.addEventListener("mousemove", handleTransformMouseMove);
      document.addEventListener("mouseup", handleTransformMouseUp);
      document.addEventListener("mouseleave", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleTransformMouseMove);
      document.removeEventListener("mouseup", handleTransformMouseUp);
      document.removeEventListener("mouseleave", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleTransformMouseMove);
      document.removeEventListener("mouseup", handleTransformMouseUp);
      document.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isTransforming]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && isSelected) {
        removeComponent(info._id, "Text");
      }
    };
    if (isSelected) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSelected, info._id, removeComponent]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [componentRef, setIsEditing]);

  return {
    localPosition: position,
    localSize: size,
    handleMouseDown,
    handleTransformMouseDown,
    handleResizeMouseDown,
    componentRef,
    isSelected,
    deg,
    inputRef,
    handleDoubleClick,
    isEditing,
    handleBlur,
    setIsEditing, // Expose setIsEditing to be used in the component,
    isTransformButtonPressed,
  };
};

export default useTextComponentViewModel;
