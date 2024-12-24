import React, { useState } from "react";
import { useDraggable, DragOverlay } from "@dnd-kit/core";

/* eslint react/prop-types: 0 */
const Text = ({ drag }) => {
  const [draggingText, setDraggingText] = useState(null);

  const handleDragStart = (text) => {
    const textWithComponentType = { ...text, type: "Text" };
    setDraggingText(textWithComponentType);
    drag(textWithComponentType);
  };

  const TextPalette = ({ onDragStart }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: "text",
    });

    return (
      <div className='grid grid-cols-1 gap-2'>
        <div
          ref={setNodeRef}
          style={{
            width: "240px",
            height: "40px",
            backgroundColor: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
          {...listeners}
          {...attributes}
          onMouseDown={() => onDragStart({ content: "Sample Text" })}
          className='bg-transparent border-2 cursor-pointer hover font-bold p-3 rounded-md text-x1 border-[#3c3c3d] hover:bg-gray-200 text-black'>
          <h2>Add new text</h2>
        </div>
      </div>
    );
  };

  return (
    <div>
      <TextPalette onDragStart={handleDragStart} />
      <DragOverlay>
        {draggingText ? (
          <div
            style={{ fontSize: "16px", color: "#000000", textAlign: "center" }}>
            {draggingText.content}
          </div>
        ) : null}
      </DragOverlay>
    </div>
  );
};

export default Text;
