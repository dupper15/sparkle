import { useDroppable } from "@dnd-kit/core";

const Test = ({ children }) => {
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

export default Test;
