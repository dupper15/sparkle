// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineChangeCircle } from "react-icons/md";
import _ from "lodash";
import ShapeService from "../services/ShapeService.js";

/* eslint react/prop-types: 0 */
const CreateComponent = ({
  info,
  removeComponent,
  onClick,
  selectedComponents,
  isFocused,
  userNames,
}) => {
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
  const startTransformRef = useRef({
    x: 0,
    y: 0,
    width: 90,
    height: 90,
    rotate: 0,
  });
  const [deg, setDeg] = useState(0);
  const componentRef = useRef(null);

  const isSelected = selectedComponents.includes(info._id);

  const updateShapeInDatabase = useRef(
    _.debounce((updatedData) => {
      ShapeService.updateShape(info._id, updatedData)
        .then(() => {})
        .catch((error) => {
          console.error("Failed to update shape", error);
        });
    }, 500) // Adjust debounce time as needed
  ).current;

  const calculateTransform = (e) => {
    const dx = e.clientX - startTransformRef.current.x;
    const dy = e.clientY - startTransformRef.current.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    // Tính toán góc xoay
    return angle < 0 ? angle + 360 : angle;
  };

  const handleTransformMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isResizing) {
      setIsTransforming(true);
      startTransformRef.current = {
        x: e.clientX,
        y: e.clientY,
        rotate: deg, // Khởi tạo góc quay ban đầu là 0 độ
      };
    }
  };

  const handleTransformMouseUp = () => {
    setIsTransforming(false);
  };

  const handleTransformMouseMove = (e) => {
    if (isTransforming) {
      const newDeg = calculateTransform(e);
      setDeg(newDeg);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    if (!isResizing) {
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      setIsDragging(true);
      // setIsSelected(true);
    }
  };
  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({ x: newX, y: newY });
      updateShapeInDatabase({
        x: newX,
        y: newY,
        width: size.width,
        height: size.height,
      });
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
      updateShapeInDatabase({
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    }
  };

  useEffect(() => {
    if (isDragging || isResizing || isTransforming) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isResizing, isTransforming]);

  useEffect(() => {
    if (isTransforming) {
      document.addEventListener("mousemove", handleTransformMouseMove);
      document.addEventListener("mouseup", handleTransformMouseUp);
    } else {
      document.removeEventListener("mousemove", handleTransformMouseMove);
      document.removeEventListener("mouseup", handleTransformMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleTransformMouseMove);
      document.removeEventListener("mouseup", handleTransformMouseUp);
    };
  }, [isTransforming]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && isSelected) {
        removeComponent(info._id, "Shape");
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

  const getShapeStyle = (info) => {
    const baseStyle = {
      width: `${size.width}px`,
      height: "100%",
      backgroundColor: info.color ? info.color : "#e5e5e5", // backgroundColor: info.link ? "#e5e5e5" : "#e5e5e5",
      backgroundImage: info.link ? `url(${info.link})` : null,
      backgroundSize: "cover",
      clipPath: info.clipPath,
    };

    const shapeStyles = {
      rect: {},
      circle: { borderRadius: "50%" },
      triangle: {
        clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
        position: "relative",
      },
      invertedTriangle: { clipPath: "polygon(50% 100%, 0 0, 100% 0)" },
      pentagon: {
        clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
      },
      hexagon: {
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      },
      octagon: {
        clipPath:
          "polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)",
      },
      arrowUp: {
        clipPath:
          "polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%)",
      },
      arrowDown: {
        clipPath:
          "polygon(50% 100%, 100% 50%, 75% 50%, 75% 0%, 25% 0%, 25% 50%, 0% 50%)",
      },
      arrowRight: {
        clipPath:
          "polygon(0% 50%, 50% 0%, 50% 25%, 100% 25%, 100% 75%, 50% 75%, 50% 100%)",
      },
      arrowLeft: {
        clipPath:
          "polygon(100% 50%, 50% 0%, 50% 25%, 0% 25%, 0% 75%, 50% 75%, 50% 100%)",
      },
    };

    return { ...baseStyle, ...shapeStyles[info.shapeType] };
  };

  return (
    <div
      ref={componentRef}
      className='wrapperDiv'
      style={{
        position: "absolute",
        width: size.width + 20,
        height: size.height + 20,
        left: position.x,
        top: position.y,
        zIndex: info.zIndex,
        padding: "10px 10px 30px 10px",
        border: isFocused ? "2px solid #60a5fa" : "none",
        clipPath: info.clipPath,
        transform: `rotate(${deg}deg)`, // Xoay shape
        transformOrigin: "center", // Xác định gốc xoay tại trung tâm
      }}
      onMouseDown={handleMouseDown}>
      <p>type: {info.type}</p>
      {/* Nút xoay (icon) */}
      {isSelected && (
        <MdOutlineChangeCircle
          size={20}
          className='resize-handle transform-icon'
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-30px",
            transform: "translateX(-50%)",
            cursor: "pointer",
            zIndex: 10,
          }}
          onMouseDown={handleTransformMouseDown}
        />
      )}

      {/* Nút resize 8 hướng */}
      {isSelected && (
        <>
          {/* Top-Left */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "top-left")}
            style={{
              position: "absolute",
              top: "-10px",
              left: "-10px",
              width: "10px",
              height: "10px",
              cursor: "nwse-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          {/* Top */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "top")}
            style={{
              position: "absolute",
              top: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "10px",
              height: "10px",
              cursor: "ns-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          {/* Top-Right */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "top-right")}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              width: "10px",
              height: "10px",
              cursor: "nesw-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          {/* Right */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "right")}
            style={{
              position: "absolute",
              top: "50%",
              right: "-10px",
              transform: "translateY(-50%)",
              width: "10px",
              height: "10px",
              cursor: "ew-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          {/* Bottom-Right */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-right")}
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "-10px",
              width: "10px",
              height: "10px",
              cursor: "nwse-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          {/* Bottom */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom")}
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "10px",
              height: "10px",
              cursor: "ns-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          {/* Bottom-Left */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "bottom-left")}
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "-10px",
              width: "10px",
              height: "10px",
              cursor: "nesw-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
          {/* Left */}
          <div
            onMouseDown={(e) => handleResizeMouseDown(e, "left")}
            style={{
              position: "absolute",
              top: "50%",
              left: "-10px",
              transform: "translateY(-50%)",
              width: "10px",
              height: "10px",
              cursor: "ew-resize",
              backgroundColor: "blue",
              zIndex: 10,
            }}
          />
        </>
      )}

      {/* Nội dung của shape */}
      <div
        onClick={(event) => {
          onClick(info, event);
        }}
        style={getShapeStyle(info)}
        className='resizable-component group hover:border-[2px] hover:border-indigo-500 shadow-md relative'></div>
      {Object.entries(userNames).map(([index, value]) => (
        <div
          key={index}
          style={{
            position: "absolute",
            right: 5,
            top: `${index * 20}px`,
            zIndex: 100,
          }}>
          <span
            className='block text-xs bg-blue-400 text-white rounded-lg py-0.5 px-1 text-center cursor-not-allowed'
            style={{
              display: "inline-block",
            }}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CreateComponent;
