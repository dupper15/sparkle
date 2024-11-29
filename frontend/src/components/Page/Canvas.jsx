import React, {useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CreateComponent from "../../components/CreateComponent";
import { useDroppable } from "@dnd-kit/core";
import { useDarkMode } from "../../contexts/DarkModeContext";
import ImageToolbar from "../SharedComponents/ToolBars/ImageToolBar/ImageToolBar.jsx";
import TextToolbar from "../SharedComponents/ToolBars/TextToolBar/TextToolBar.jsx";
const Canvas = React.forwardRef(
  (
    {
      id,
      title,
      bgLink,
      width,
      height,
      upButton,
      downButton,
      removeButton,
      shapes,
      removeElement,
      current_page,
      onDragEnd,
      updateShapePosition,
    },
    ref
  ) => {
      const [selectedComponentId, setSelectedComponentId] = useState(null);
      const [isImageToolBarOpen, setOpenImageToolBar] = useState(false);
      const [isTextToolBarOpen, setOpenTextToolBar] = useState(false);

      const pageRef = useRef(null);
      const handleImageClick = (id) => {
          setOpenImageToolBar(true);
          setOpenTextToolBar(false);
          setSelectedComponentId(id);
      };

      const handleTextClick = (id) => {
          setOpenTextToolBar(true);
          setOpenImageToolBar(false);
          setSelectedComponentId(id);
      };

      const handleClickOutside = (event) => {
          if (pageRef.current && !pageRef.current.contains(event.target)) {
              setOpenImageToolBar(false);
              setOpenTextToolBar(false);
              setSelectedComponentId(null);
          }
      };
    const { isOver, setNodeRef } = useDroppable({ id });

      useEffect(() => {
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
              document.removeEventListener("mousedown", handleClickOutside);
          };
      }, []);

      // useEffect(() => {
      //     if (project?.canvasArray) {
      //         const newPages = project.canvasArray.map((canvas, index) => ({
      //             ...canvas,
      //             id: canvas.id || index,
      //             name: canvas.name || `Canvas ${index + 1}`,
      //         }));
      //         setPages(newPages);
      //         setCurrentPage(newPages[0]?.id)
      //     }
      // },

      const { isDarkMode } = useDarkMode();

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
                className={`flex justify-between items-center ${
                    isDarkMode ? "text-white" : "text-black"
                }`}>
                <div className="text-2xl font-bold">Page {title}</div>
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
                {/* eslint-disable-next-line react/prop-types */}
                {shapes.map((info) =>
                    info.type === "text" ? (
                        <div
                            key={info.id}
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
                            }}>
                            {info.title}
                            onClick={() => handleTextClick(info.id)}
                        </div>
                    ) : (
                        <CreateComponent
                            key={info.id}
                            info={info}
                            current_component={info}
                            current_page={current_page}
                            removeComponent={removeElement}
                            updateShapePosition={updateShapePosition}
                            onClick={() => handleImageClick(info.id)}
                        />
                    )
                )}
            </div>
        </div>
    );
  }
);

Canvas.displayName = "Canvas";
export default Canvas;
