import { useDroppable } from "@dnd-kit/core";
import React from "react";
import template from "../assets/bg-dm.png";

const Test = ({ items, id, bgLink }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const shapeStyles = (shape) => ({
    position: "absolute",
    left: shape.x,
    top: shape.y,
    width: "90px",
    height: "90px",
    zIndex: 10,
    backgroundColor: shape.link ? "transparent" : "#e5e5e5",
    backgroundImage: shape.link ? `url(${shape.link})` : "#e5e5e5",
    backgroundSize: "cover",
  });

  const renderShapes = () =>
    items.map((shape) => <div key={shape.id} style={shapeStyles(shape)}></div>);

  return (
    <div
      ref={setNodeRef}
      id={id}
      style={{
        position: "relative",
        width: "500px",
        height: "300px",
        border: isOver ? "1px solid red" : "",
        backgroundColor: !bgLink ? "white" : "white",
        backgroundImage: bgLink ? `url(${bgLink})` : "",
        backgroundSize: "cover",
        overflow: "hidden",
        zIndex: 0,
      }}>
      {isOver ? "Thả vào đây!" : "Kéo phần tử vào"}
      {renderShapes()}
    </div>
  );
};

export default Test;
