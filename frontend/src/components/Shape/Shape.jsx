import { useState } from "react";
import { useDraggable, DragOverlay } from "@dnd-kit/core";

const shapesList = [
  { id: "rect", shapeType: "rect" },
  { id: "circle", shapeType: "circle" },
  { id: "triangle", shapeType: "triangle" },
  { id: "invertedTriangle", shapeType: "invertedTriangle" },
  { id: "pentagon", shapeType: "pentagon" },
  { id: "hexagon", shapeType: "hexagon" },
  { id: "octagon", shapeType: "octagon" },
  { id: "arrowUp", shapeType: "arrowUp" },
  { id: "arrowDown", shapeType: "arrowDown" },
  { id: "arrowRight", shapeType: "arrowRight" },
  { id: "arrowLeft", shapeType: "arrowLeft" },
];

const ShapePalette = ({ onDragStart }) => {
  return (
    <div className='grid grid-cols-3 gap-2 mb-4'>
      {shapesList.map((shape) => (
        <DraggableShape
          key={shape.id}
          shape={shape}
          onDragStart={onDragStart}
        />
      ))}
    </div>
  );
};

const DraggableShape = ({ shape, onDragStart }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: shape.id,
  });

  const getShapeStyle = () => {
    switch (shape.shapeType) {
      case "rectangle":
        return {}; // Hình chữ nhật (mặc định)
      case "circle":
        return { borderRadius: "50%" }; // Hình tròn
      case "triangle":
        return {
          clipPath: "polygon(50% 0,100% 100%, 0 100%)",
        }; // Hình tam giác
      case "invertedTriangle":
        return {
          clipPath: "polygon(50% 100%, 0 0, 100% 0)",
        }; // Hình tam giác ngược
      case "pentagon":
        return {
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
        }; // Hình ngũ giác
      case "hexagon":
        return {
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }; // Hình lục giác
      case "octagon":
        return {
          clipPath:
            "polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)",
        }; // Hình bát giác
      case "arrowUp":
        return {
          clipPath:
            "polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%)",
        }; // Mũi tên hướng lên
      case "arrowDown":
        return {
          clipPath:
            "polygon(50% 100%, 100% 50%, 75% 50%, 75% 0%, 25% 0%, 25% 50%, 0% 50%)",
        }; // Mũi tên hướng xuống
      case "arrowRight":
        return {
          clipPath:
            "polygon(0% 50%, 50% 0%, 50% 25%, 100% 25%, 100% 75%, 50% 75%, 50% 100%)",
        }; // Mũi tên hướng phải
      case "arrowLeft":
        return {
          clipPath:
            "polygon(100% 50%, 50% 0%, 50% 25%, 0% 25%, 0% 75%, 50% 75%, 50% 100%)",
        }; // Mũi tên hướng trái
      default:
        return {};
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "90px",
        height: "90px",
        backgroundColor: "#e5e5e5",
        cursor: "pointer",
        ...getShapeStyle(),
      }}
      {...listeners}
      {...attributes}
      onMouseDown={() => onDragStart(shape)}
    />
  );
};

const Shape = ({ addNewShape, drag }) => {
  const [shapes, setShapes] = useState([]);
  const [draggingShape, setDraggingShape] = useState(null);

  const handleDragStart = (shape) => {
    setDraggingShape(shape);
    drag(shape);
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;

    if (over && over.id === "drop-area" && draggingShape) {
      const dropAreaRect = document
        .getElementById("drop-area")
        .getBoundingClientRect();

      const shapeRect = active.rect.current.translated;

      setShapes((prevShapes) => [
        ...prevShapes,
        {
          id: Date.now(),
          shapeType: draggingShape.shapeType,
          x: shapeRect.left - dropAreaRect.left,
          y: shapeRect.top - dropAreaRect.top,
        },
      ]);
    }
    setDraggingShape(null);
  };

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
          backgroundColor: "#e5e5e5",
          zIndex: 10,
          ...(shape.shapeType === "circle" && { borderRadius: "50%" }), // Hình tròn
          ...(shape.shapeType === "triangle" && {
            clipPath: "polygon(50% 0,100% 100%, 0 100%)", // Hình tam giác
          }),
          ...(shape.shapeType === "invertedTriangle" && {
            clipPath: "polygon(50% 100%, 0 0, 100% 0)", // Hình tam giác ngược
          }),
          ...(shape.shapeType === "pentagon" && {
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)", // Hình ngũ giác
          }),
          ...(shape.shapeType === "hexagon" && {
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hình lục giác
          }),
          ...(shape.shapeType === "octagon" && {
            clipPath:
              "polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)", // Hình bát giác
          }),
          ...(shape.shapeType === "arrowUp" && {
            clipPath:
              "polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%)", // Mũi tên hướng lên
          }),
          ...(shape.shapeType === "arrowDown" && {
            clipPath:
              "polygon(50% 100%, 100% 50%, 75% 50%, 75% 0%, 25% 0%, 25% 50%, 0% 50%)", // Mũi tên hướng xuống
          }),
          ...(shape.shapeType === "arrowRight" && {
            clipPath:
              "polygon(0% 50%, 50% 0%, 50% 25%, 100% 25%, 100% 75%, 50% 75%, 50% 100%)", // Mũi tên hướng phải
          }),
          ...(shape.shapeType === "arrowLeft" && {
            clipPath:
              "polygon(100% 50%, 50% 0%, 50% 25%, 0% 25%, 0% 75%, 50% 75%, 50% 100%)", // Mũi tên hướng trái
          }),
        }}></div>
    ));
  };

  return (
    <div>
      <ShapePalette onDragStart={handleDragStart} />

      <DragOverlay>
        {draggingShape ? (
          <div
            style={{
              width: "90px",
              height: "90px",
              backgroundColor: "#e5e5e5",
              ...(draggingShape.shapeType === "circle" && {
                borderRadius: "50%",
              }), // Hình tròn
              ...(draggingShape.shapeType === "triangle" && {
                clipPath: "polygon(50% 0,100% 100%, 0 100%)", // Hình tam giác
              }),
              ...(draggingShape.shapeType === "invertedTriangle" && {
                clipPath: "polygon(50% 100%, 0 0, 100% 0)", // Hình tam giác ngược
              }),
              ...(draggingShape.shapeType === "pentagon" && {
                clipPath:
                  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)", // Hình ngũ giác
              }),
              ...(draggingShape.shapeType === "hexagon" && {
                clipPath:
                  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hình lục giác
              }),
              ...(draggingShape.shapeType === "octagon" && {
                clipPath:
                  "polygon(50% 0%, 85% 15%, 100% 50%, 85% 85%, 50% 100%, 15% 85%, 0% 50%, 15% 15%)", // Hình bát giác
              }),
              ...(draggingShape.shapeType === "arrowUp" && {
                clipPath:
                  "polygon(50% 0%, 100% 50%, 75% 50%, 75% 100%, 25% 100%, 25% 50%, 0% 50%)", // Mũi tên hướng lên
              }),
              ...(draggingShape.shapeType === "arrowDown" && {
                clipPath:
                  "polygon(50% 100%, 100% 50%, 75% 50%, 75% 0%, 25% 0%, 25% 50%, 0% 50%)", // Mũi tên hướng xuống
              }),
              ...(draggingShape.shapeType === "arrowRight" && {
                clipPath:
                  "polygon(0% 50%, 50% 0%, 50% 25%, 100% 25%, 100% 75%, 50% 75%, 50% 100%)", // Mũi tên hướng phải
              }),
              ...(draggingShape.shapeType === "arrowLeft" && {
                clipPath:
                  "polygon(100% 50%, 50% 0%, 50% 25%, 0% 25%, 0% 75%, 50% 75%, 50% 100%)", // Mũi tên hướng trái
              }),
            }}></div>
        ) : null}
      </DragOverlay>
    </div>
  );
};

export default Shape;
