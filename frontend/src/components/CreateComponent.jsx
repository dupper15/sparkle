import React, { useState, useRef, useEffect } from "react";
import { MdOutlineChangeCircle } from "react-icons/md";

const CreateComponent = ({ info, current_component, removeComponent }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: info.x, y: info.y });
  const [size, setSize] = useState({ width: 90, height: 90 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [resizeStartPosition, setResizeStartPosition] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState(info.rotate || 0); 
  const [isRotating, setIsRotating] = useState(false); // Trạng thái xoay
  const startAngleRef = useRef(0); // Góc bắt đầu khi nhấn chuột

  const calculateRotation = (e) => {
    const centerX = position.x + size.width / 2;
    const centerY = position.y + size.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return angle;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!isResizing) {
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      setIsDragging(true);
      setIsSelected(true);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
    } else if (isResizing) {
      handleResizeMouseMove(e);
    } else if (isRotating) {
      const newAngle = calculateRotation(e);
      setRotate(newAngle);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setIsRotating(false);
    setResizeDirection(null);
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
    }
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".resizable-component")) {
      setIsSelected(false);
    }
  };

  const handleRotateMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRotating(true);
    startAngleRef.current = calculateRotation(e) - rotate;

    document.addEventListener("mousemove", handleRotateMouseMove);
    document.addEventListener("mouseup", handleRotateMouseUp);
  };

  const handleRotateMouseMove = (e) => {
    if (isRotating) {
        const newAngle = calculateRotation(e);
        const angleDifference = newAngle - startAngleRef.current;
        setRotate((prevRotate) => prevRotate + angleDifference);
        startAngleRef.current = newAngle; // Cập nhật lại góc để làm tham chiếu cho lần xoay tiếp theo
    }
};
  const handleRotateMouseUp = () => {
    setIsRotating(false);
    document.removeEventListener("mousemove", handleRotateMouseMove);
    document.removeEventListener("mouseup", handleRotateMouseUp);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && isSelected) {
        removeComponent(info.id);
      }
    };

    // Add event listener when component is selected
    if (isSelected) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Clean up event listener when component is deselected or unmounted
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSelected, info.id, removeComponent]);

  const getShapeStyle = (type) => {
    const baseStyle = {
      width: `${size.width}px`,
      height: `${size.height}px`,
      backgroundColor: "#e5e5e5",
      position: "absolute",
      left: position.x,
      top: position.y,
      zIndex: 10,
      cursor: "move",
      transform: `rotate(${rotate}deg)`
    };

    const shapeStyles = {
      rect: {},
      circle: { borderRadius: "50%" },
      triangle: { clipPath: "polygon(50% 0, 100% 100%, 0 100%)" },
      invertedTriangle: { clipPath: "polygon(50% 100%, 0 0, 100% 0)" },
      pentagon: { clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" },
      hexagon: { clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" },
      octagon: { clipPath: "polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)" },
      arrowUp: { clipPath: "polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%)" },
      arrowDown: { clipPath: "polygon(50% 100%, 100% 50%, 75% 50%, 75% 0%, 25% 0%, 25% 50%, 0% 50%)" },
      arrowRight: { clipPath: "polygon(0% 50%, 50% 0%, 50% 25%, 100% 25%, 100% 75%, 50% 75%, 50% 100%)" },
      arrowLeft: { clipPath: "polygon(100% 50%, 50% 0%, 50% 25%, 0% 25%, 0% 75%, 50% 75%, 50% 100%)" },
    };

    return { ...baseStyle, ...shapeStyles[type] };
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onClick={() => info.setCurrentComponent(info)}
      style={getShapeStyle(info.shapeType)}
      className="resizable-component group hover:border-[2px] hover:border-indigo-500 shadow-md relative"
    >
      {isSelected && (
        <MdOutlineChangeCircle
          className="resize-handle rotate-icon"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-40px",
            transform: "translateX(-50%)",
            cursor: "pointer",
          }}
          onMouseDown={handleRotateMouseDown}
        />
      )}


      {isSelected && (
        <>
          <div onMouseDown={(e) => handleResizeMouseDown(e, "top-left")} style={{ position: "absolute", top: "-10px", left: "-10px", width: "10px", height: "10px", cursor: "nwse-resize", backgroundColor: "blue" }} />
          <div onMouseDown={(e) => handleResizeMouseDown(e, "top")} style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", width: "10px", height: "10px", cursor: "ns-resize", backgroundColor: "blue" }} />
          <div onMouseDown={(e) => handleResizeMouseDown(e, "top-right")} style={{ position: "absolute", top: "-10px", right: "-10px", width: "10px", height: "10px", cursor: "nesw-resize", backgroundColor: "blue" }} />
          <div onMouseDown={(e) => handleResizeMouseDown(e, "right")} style={{ position: "absolute", top: "50%", right: "-10px", transform: "translateY(-50%)", width: "10px", height: "10px", cursor: "ew-resize", backgroundColor: "blue" }} />
          <div onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")} style={{ position: "absolute", bottom: "-10px", right: "-10px", width: "10px", height: "10px", cursor: "nwse-resize", backgroundColor: "blue" }} />
          <div onMouseDown={(e) => handleResizeMouseDown(e, "bottom")} style={{ position: "absolute", bottom: "-10px", left: "50%", transform: "translateX(-50%)", width: "10px", height: "10px", cursor: "ns-resize", backgroundColor: "blue" }} />
          <div onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")} style={{ position: "absolute", bottom: "-10px", left: "-10px", width: "10px", height: "10px", cursor: "nesw-resize", backgroundColor: "blue" }} />
          <div onMouseDown={(e) => handleResizeMouseDown(e, "left")} style={{ position: "absolute", top: "50%", left: "-10px", transform: "translateY(-50%)", width: "10px", height: "10px", cursor: "ew-resize", backgroundColor: "blue" }} />
        </>
      ) }


    </div>
  );
};

export default CreateComponent;
