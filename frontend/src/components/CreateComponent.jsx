import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const CreateComponent = ({ info, current_component, removeComponent }) => {
  const getShapeStyle = (type) => {
    const baseStyle = {
      width: info.width + "px",
      height: info.height + "px",
      background: info.color,
      position: "absolute",
      left: info.left + "px",
      top: info.top + "px",
      zIndex: info.z_index,
      transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
    };

    const shapeStyles = {
      rect: {},
      circle: { borderRadius: "50%" },
      triangle: { clipPath: "polygon(50% 0,100% 100%, 0 100%)" },
      pentagon: {
        clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
      },
      hexagon: {
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      },
      octagon: {
        clipPath:
          "polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%)",
      },
    };

    return { ...baseStyle, ...shapeStyles[type] };
  };

  return (
    <div
      ref={setNodeRef}
      onClick={() => info.setCurrentComponent(info)}
      style={getShapeStyle(info.type)}
      className='group hover:border-[2px] hover:border-indigo-500 shadow-md'>
      {current_component.id === info.id && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            removeComponent(info.id);
          }}
          className='px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md'>
          <FaRegTrashCan />
        </div>
      )}
    </div>
  );
};

export default CreateComponent;
