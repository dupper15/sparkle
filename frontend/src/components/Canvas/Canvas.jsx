import React, { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CreateComponent from "../../components/CreateComponent";
import ShapeToolBar from "../SharedComponents/ToolBars/ShapeToolBar/ShapeToolBar.jsx";
import TextToolbar from "../SharedComponents/ToolBars/TextToolBar/TextToolBar.jsx";
import useCanvasViewModel from "./CanvasViewModel.js";
import socket from "../../utils/socket";
import { FaMousePointer } from "react-icons/fa";

/* eslint react/prop-types: 0 */
const Canvas = React.forwardRef(
  (
    {
      id,
      databaseId,
      title,
      bgLink,
      width,
      height,
      upButton,
      downButton,
      removeButton,
      current_canvas,
      onDragEnd,
      updateShapePosition,
    },
    ref
  ) => {
    const {
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
        handleSendToFront
    } = useCanvasViewModel(id, databaseId);

    const [cursors, setCursors] = useState({});
    const [cursorSize, setCursorSize] = useState(16);
    useEffect(() => {
      socket.emit("join-page", databaseId);

      socket.on("update-cursor", ({ userId, x, y, userName }) => {
        setCursors((prev) => ({
          ...prev,
          [userId]: { x, y, userName },
        }));
      });

      socket.on("remove-cursor", ({ userId }) => {
        setCursors((prev) => {
          const newCursors = { ...prev };
          delete newCursors[userId];
          return newCursors;
        });
      });

      return () => {
        socket.emit("leave-page", databaseId);
        socket.off("update-cursor");
        socket.off("remove-cursor");
      };
    });

    const handleMouseMove = (e) => {
      const rect = document.getElementById(id).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      socket.emit("mousemove", { databaseId, x, y });
    };

    const handleMouseLeave = () => {
      socket.emit("mousemove", { databaseId, x: null, y: null });
    };

    return (
      <div
        ref={canvasRef}
        className='flex flex-col gap-4'
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}>
        <div className={"z-50"}>
          {isImageToolBarOpen && (
            <div className='fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-20'>
              <ShapeToolBar
                handleColorChange={handleColorChange}
                handleSendBackward={handleSendBackward}
                handleSendToBack={handleSendToBack}
                handleSendToFront={handleSendToFront}
                handleSendForward={handleSendForward}
              />
            </div>
          )}
          {isTextToolBarOpen && (
            <div className='fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-20'>
              <TextToolbar />
            </div>
          )}
        </div>
        <div><p>ref: {ref}</p></div>
        <div
          className={`flex justify-between items-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}>
          <div className='text-2xl font-bold'>Canvas {title}</div>
          <div className='flex gap-2'>
            <IoIosArrowUp
              className='hover:text-red-600 cursor-pointer text-2xl'
              onClick={upButton}
            />
            <IoIosArrowDown
              className='hover:text-red-600 cursor-pointer text-2xl'
              onClick={downButton}
            />
            <FaRegTrashCan
              className='hover:text-red-600 cursor-pointer text-xl'
              onClick={removeButton}
            />
          </div>
        </div>
        <div
          id={id}
          ref={setNodeRef}
          onDrag={onDragEnd}
          style={{
            width: `${width}px`,
            height: `${height}px`,
            border: isOver ? "2px solid blue" : "transparent",
            backgroundColor: !bgLink ? "white" : "white",
            backgroundImage: bgLink ? `url(${bgLink})` : "",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
            zIndex: 0,
          }}
          className='bg-white border relative'>
          {shapes.map((info) =>
            info.type === "text" ? (
              <div
                key={info._id}
                id={`text-${info.id}`}
                contentEditable={true}
                suppressContentEditableWarning={true}
                style={{
                  position: "absolute",
                  left: info.x,
                  top: info.y,
                  fontSize: `${info.font || 16}px`,
                  color: info.color || "#000",
                  padding: "5px",
                }}
                onClick={() => handleTextClick(info.id)}>
                {info.title}
              </div>
            ) : (
              <CreateComponent
                key={info._id}
                info={info}
                current_component={info}
                current_canvas={current_canvas}
                removeComponent={removeComponent}
                updateShapePosition={updateShapePosition}
                onClick={(info, event) => handleShapeClick(info._id, event)}
                selectedComponents={selectedComponents}
            />))}
          {Object.entries(cursors).map(([userId, position]) =>
            position.x !== null && position.y !== null ? (
              <div key={userId} className='absolute'>
                <FaMousePointer
                  className='cursor-indicator text-blue-800 absolute pointer-events-none z-[999]'
                  style={{
                    left: position.x,
                    top: position.y,
                    width: cursorSize,
                    height: cursorSize,
                    transition: "left 0.1s ease-out, top 0.1s ease-out",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: position.x + cursorSize,
                    top: position.y,
                    zIndex: 50,
                  }}>
                  <span
                    className='block text-xs bg-blue-400 text-white rounded-lg py-0.5 px-1 text-center cursor-not-allowed'
                    style={{
                      display: "inline-block",
                    }}>
                    {position.userName || "User"}
                  </span>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    );
  }
);

Canvas.displayName = "Canvas";
export default Canvas;
