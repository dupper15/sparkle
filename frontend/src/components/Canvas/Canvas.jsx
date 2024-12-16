import React, {useEffect, useState} from "react";
import {FaRegTrashCan} from "react-icons/fa6";
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io";
import CreateComponent from "../../components/CreateComponent";
import ShapeToolBar from "../SharedComponents/ToolBars/ShapeToolBar/ShapeToolBar.jsx";
import TextToolbar from "../SharedComponents/ToolBars/TextToolBar/TextToolBar.jsx";
import useCanvasViewModel from "./CanvasViewModel.js";
import {FaMousePointer} from "react-icons/fa";
import TextComponent from "../TextComponent/TextComponent.jsx";
const Canvas = React.forwardRef(({
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
                                 }, ref) => {
    const {
        components,
        selectedComponents,
        selectedTextFontFamily,
        selectedTextFontSize,
        selectedTextFontWeight,
        selectedTextFontStyle,
        selectedTextDecorationLine,
        isImageToolBarOpen,
        isTextToolBarOpen,
        isDarkMode,
        isOver,
        canvasRef,
        setNodeRef,
        handleShapeClick,
        handleTextClick,
        handleColorChange,
        handleFontFamilyChange,
        handleFontSizeChange,
        handleFontWeightChange,
        handleFontStyleChange,
        handleTextDecorationLineChange,
        handleSendBackward,
        handleSendToBack,
        handleSendForward,
        handleSendToFront,
        removeComponent,
      handleMouseMove,
      handleMouseLeave,
      cursors,
      focuses,
    } = useCanvasViewModel(id, databaseId);

    const [cursorSize, setCursorSize] = useState(16);
    useEffect(() => {
      const handleGlobalMouseLeave = (event) => {
        if (
          canvasRef.current &&
          !canvasRef.current.contains(event.relatedTarget)
        ) {
          handleMouseLeave();
        }
      };

      document.addEventListener("mouseleave", handleGlobalMouseLeave);

      return () => {
        document.removeEventListener("mouseleave", handleGlobalMouseLeave);
      };
    }, [canvasRef, handleMouseLeave]);
    return (
      <div ref={canvasRef} className='flex flex-col gap-4'>
        <div className={"z-50"}>
            {isImageToolBarOpen && (<div className='fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-20'>
                <ShapeToolBar
                    handleColorChange={handleColorChange}
                    handleSendBackward={handleSendBackward}
                    handleSendToBack={handleSendToBack}
                    handleSendToFront={handleSendToFront}
                    handleSendForward={handleSendForward}
                />
            </div>)}
            {isTextToolBarOpen && (<div className='fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-20'>
                <TextToolbar
                    selectedTextFontFamily={selectedTextFontFamily}
                    selectedTextFontSize={selectedTextFontSize}
                    selectedTextFontWeight={selectedTextFontWeight}
                    selectedTextFontStyle={selectedTextFontStyle}
                    selectedTextDecorationLine={selectedTextDecorationLine}
                    handleColorChange={handleColorChange}
                    handleSendBackward={handleSendBackward}
                    handleSendToBack={handleSendToBack}
                    handleSendToFront={handleSendToFront}
                    handleSendForward={handleSendForward}
                    handleFontFamilyChange={handleFontFamilyChange}
                    handleFontSizeChange={handleFontSizeChange}
                    handleFontWeightChange={handleFontWeightChange}
                    handleFontStyleChange={handleFontStyleChange}
                    handleTextDecorationLineChange={handleTextDecorationLineChange}
                />
            </div>)}
        </div>
        <div>
          <p>ref: {ref}</p>
        </div>
        <div
            className={`flex justify-between items-center ${isDarkMode ? "text-white" : "text-black"}`}>
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
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
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
            {components.map((info) => info.type.toLowerCase() === "text" ? (<TextComponent
                key={info._id}
                info={info}
                onClick={(info, event) => handleTextClick(info._id, event)}
                removeComponent={removeComponent}
                selectedComponents={selectedComponents}
            />) : (<CreateComponent
                key={info._id}
                info={info}
                current_component={info}
                current_canvas={current_canvas}
                removeComponent={removeComponent}
                updateShapePosition={updateShapePosition}
                onClick={(info, event) => handleShapeClick(info._id, event)}
                selectedComponents={selectedComponents}
                isFocused={
                  Array.isArray(focuses[info._id]) &&
                  focuses[info._id].length > 0
                }
                userNames={
                  Array.isArray(focuses[info._id])
                    ? focuses[info._id].map((user) => user.userName)
                    : []
                }
              />
            )
          )}
          {Object.entries(cursors).map(([userId, position]) =>
            position.x !== null &&
            position.y !== null &&
            position.databaseId === databaseId ? (
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
                    className='block text-xs bg-blue-800 text-white rounded-lg py-0.5 px-1 text-center cursor-not-allowed'
                    style={{
                      display: "inline-block",
                    }}>
                    {position.userName || "User"}
                  </span>
                    </div>
                </div>) : null)}
        </div>
    </div>);
});

Canvas.displayName = "Canvas";
export default Canvas;