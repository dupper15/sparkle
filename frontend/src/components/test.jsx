import { useDroppable } from "@dnd-kit/core";
import { useRef, useEffect } from "react";

const Test = ({ shapes, id }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const renderShapes = () => {
    return shapes.map((shape) => (
      <div
        key={shape.id}
        style={{
          position: "absolute",
          left: shape.x,
          top: shape.y,
          width: "90px",
          height: "90px",
          zIndex: 10,
          backgroundColor: "#e5e5e5",
          ...(shape.shapeType === "circle" && { borderRadius: "50%" }),
          ...(shape.shapeType === "triangle" && {
            clipPath: "polygon(50% 0,100% 100%, 0 100%)",
          }),
          ...(shape.shapeType === "star" && {
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }),
          ...(shape.shapeType === "hexagon" && {
            clipPath:
              "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
          }),
          ...(shape.shapeType === "pentagon" && {
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }),
        }}></div>
    ));
  };

  return (
    <div
      ref={setNodeRef}
      id={id}
      style={{
        position: "relative",
        top: "50px",
        left: "0",
        width: "100%",
        height: "300px",
        border: isOver ? "1px solid red" : "",
        backgroundColor: "white",
        overflow: "hidden",
        zIndex: 0,
      }}>
      {isOver ? "Thả vào đây!" : "Kéo phần tử vào"}
      {renderShapes()}
    </div>
  );
};

export default Test;
