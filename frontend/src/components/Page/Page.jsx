import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CreateComponent from "../../components/CreateComponent";
import { useDroppable } from "@dnd-kit/core";
import { useDarkMode } from "../../contexts/DarkModeContext";

const Page = React.forwardRef(
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
    const { isOver, setNodeRef } = useDroppable({ id });

    const [selectedId, setSelectedId] = useState(null); // Lưu trữ id của shape được chọn

    const handleSelect = (id) => {
      setSelectedId(id); // Cập nhật id của shape được chọn
    };

    const components = [
      { id: 1, shapeType: "rect", x: 50, y: 50, clipPath: "", link: "" },
      { id: 2, shapeType: "circle", x: 200, y: 200, clipPath: "", link: "" },
      // Thêm các shapes khác
    ];

    const { isDarkMode } = useDarkMode();

    return (
      <div ref={ref} className="flex flex-col gap-4">
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
            backgroundColor: bgLink ? "white" : "white",
            backgroundImage: `url(${bgLink})` ,
            backgroundSize: "cover",
            overflow: "hidden",
            zIndex: 0,
          }}
          className="bg-white border relative">
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
              </div>
            ) : (
              <CreateComponent
                key={info.id}
                info={info}
                current_component={info}
                current_page={current_page}
                removeComponent={removeElement}
                updateShapePosition={updateShapePosition}
              />
            )
          )}
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";
export default Page;
