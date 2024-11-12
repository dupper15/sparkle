import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const CreateComponent = ({ info, current_component, removeComponent }) => {
  const getShapeStyle = (type) => {
    const baseStyle = {
      width: "90px",
      height: "90px",
      backgroundColor: "#e5e5e5",
      position: "absolute",
      left: info.x,
      top: info.y,
      zIndex: 10,
      transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
    };

    const shapeStyles = {
      rect: {},
      circle: { borderRadius: "50%" },
      triangle: { clipPath: "polygon(50% 0, 100% 100%, 0 100%)" },
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

    return { ...baseStyle, ...shapeStyles[type] };
  };

  return (
    <div
      onClick={() => info.setCurrentComponent(info)}
      style={getShapeStyle(info.shapeType)}
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
