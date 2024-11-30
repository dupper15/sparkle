import React from "react";
import {FaRegTrashCan} from "react-icons/fa6";
import {IoIosArrowUp, IoIosArrowDown} from "react-icons/io";
import CreateComponent from "../../components/CreateComponent";
import ImageToolbar from "../SharedComponents/ToolBars/ImageToolBar/ImageToolBar.jsx";
import TextToolbar from "../SharedComponents/ToolBars/TextToolBar/TextToolBar.jsx";
import useCanvasViewModel from "./CanvasViewModel.js";

/* eslint react/prop-types: 0 */
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
        selectedComponentId,
        isImageToolBarOpen,
        isTextToolBarOpen,
        isOver,
        setNodeRef,
        isDarkMode,
        handleImageClick,
        handleTextClick,
        removeElement,
        shapes,
    } = useCanvasViewModel(id, databaseId);

    return (
        <div ref={ref} className="flex flex-col gap-4">
            <div className={"z-50"}>
                {isImageToolBarOpen && (
                    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-20">
                        <ImageToolbar selectedComponentId={selectedComponentId}/>
                    </div>
                )}
                {isTextToolBarOpen && (
                    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-20">
                        <TextToolbar/>
                    </div>
                )}
            </div>
            <div
                className={`flex justify-between items-center ${isDarkMode ? "text-white" : "text-black"}`}>
                <div className="text-2xl font-bold">Canvas {title}</div>
                <div className="flex gap-2">
                    <IoIosArrowUp
                        className="hover:text-red-600 cursor-pointer text-2xl"
                        onClick={upButton}
                    />
                    <IoIosArrowDown
                        className="hover:text-red-600 cursor-pointer text-2xl"
                        onClick={downButton}
                    />
                    <FaRegTrashCan
                        className="hover:text-red-600 cursor-pointer text-xl"
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
                    backgroundSize: "cover",
                    overflow: "hidden",
                    zIndex: 0,
                }}
                className="bg-white border relative">
                {shapes.map((info, index) => info.type === "text" ? (
                    <div
                        key={index}
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
                        key={index}
                        info={info}
                        current_component={info}
                        current_canvas={current_canvas}
                        removeComponent={removeElement}
                        updateShapePosition={updateShapePosition}
                        onClick={() => handleImageClick(info.id)}
                    />
                ))}
            </div>
        </div>
    );
});

Canvas.displayName = "Canvas";
export default Canvas;