import React, { useEffect, useState } from "react";
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

const shapesList = [
  { id: "rect", shapeType: "rect" },
  { id: "circle", shapeType: "circle" },
  { id: "triangle", shapeType: "triangle" },
  { id: "star", shapeType: "star" },
  { id: "hexagon", shapeType: "hexagon" },
  { id: "pentagon", shapeType: "pentagon" },
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
      case "circle":
        return { borderRadius: "50%" };
      case "triangle":
        return { clipPath: "polygon(50% 0, 100% 100%, 0 100%)" };
      case "star":
        return {
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        };
      case "hexagon":
        return {
          clipPath:
            "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
        };
      case "pentagon":
        return {
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
        };
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

const DropArea = ({ children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "drop-area",
  });

  return (
    <div
      ref={setNodeRef}
      id='drop-area'
      style={{
        position: "relative",
        top: "50px",
        left: "0",
        width: "100%",
        height: "300px",
        border: isOver ? "2px dashed #4CAF50" : "2px dashed #ccc",
        backgroundColor: isOver ? "#e0f7e7" : "red",
        overflow: "hidden",
        zIndex: 0,
      }}>
      {isOver ? "Thả vào đây!" : "Kéo phần tử vào"}
      {children}
    </div>
  );
};

const Shape = ({ sendRenderShapesToParent }) => {
  const [shapes, setShapes] = useState([]);
  const [draggingShape, setDraggingShape] = useState(null);

  const handleDragStart = (shape) => {
    setDraggingShape(shape);
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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <ShapePalette onDragStart={handleDragStart} />

      <DropArea>{renderShapes()}</DropArea>

      <DragOverlay>
        {draggingShape ? (
          <div
            style={{
              width: "90px",
              height: "90px",
              backgroundColor: "#e5e5e5",
              ...(draggingShape.shapeType === "circle" && {
                borderRadius: "50%",
              }),
              ...(draggingShape.shapeType === "triangle" && {
                clipPath: "polygon(50% 0,100% 100%, 0 100%)",
              }),
              ...(draggingShape.shapeType === "star" && {
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }),
              ...(draggingShape.shapeType === "hexagon" && {
                clipPath:
                  "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
              }),
              ...(draggingShape.shapeType === "pentagon" && {
                clipPath:
                  "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }),
            }}></div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Shape;
