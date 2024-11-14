import { useDroppable } from "@dnd-kit/core";
import { useEffect, useState } from "react";

const Test = ({ items, id, bgLink }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const [texts, setTexts] = useState(items);

  useEffect(() => {
    setTexts(items);
  }, [items]); // Cập nhật texts khi items thay đổi

  const handleTextChange = (e, textId) => {
    const newText = e.target.innerText;

    // Lưu vị trí con trỏ hiện tại trước khi cập nhật
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const cursorPosition = range.startOffset;

    // Cập nhật nội dung mới
    setTexts((prevTexts) =>
      prevTexts.map((text) =>
        text.id === textId ? { ...text, title: newText } : text
      )
    );

    // Đặt lại vị trí con trỏ ở vị trí cũ sau khi cập nhật
    setTimeout(() => {
      const element = document.getElementById(`text-${textId}`);
      const newRange = document.createRange();
      const newSelection = window.getSelection();

      if (element && element.childNodes[0]) {
        // Giới hạn vị trí con trỏ trong độ dài của nội dung mới để tránh lỗi
        const newCursorPosition = Math.min(cursorPosition, newText.length);

        newRange.setStart(element.childNodes[0], newCursorPosition);
        newRange.collapse(true);
        newSelection.removeAllRanges();
        newSelection.addRange(newRange);
      }
    }, 0);
  };

  const shapeStyles = (shape) => ({
    position: "absolute",
    left: shape.x,
    top: shape.y,
    padding: "5px",
    zIndex: 10,
    color: shape.color || "#000",
    fontSize: `${shape.font || 16}px`,
    backgroundColor: shape.link ? "transparent" : "#e5e5e5",
    backgroundImage: shape.link ? `url(${shape.link})` : "none",
    backgroundSize: "cover",
  });

  const renderShapes = () => {
    return texts.map((shape) => (
      <div
        key={shape.id}
        id={`text-${shape.id}`} // Thêm id cho mỗi phần tử
        style={shapeStyles(shape)}
        contentEditable={shape.type === "text"}
        suppressContentEditableWarning={true}
        onInput={(e) => handleTextChange(e, shape.id)}>
        {shape.type === "text" ? shape.title : ""}
      </div>
    ));
  };

  return (
    <div
      ref={setNodeRef}
      id={id}
      style={{
        position: "relative",
        width: "500px",
        height: "300px",
        border: isOver ? "1px solid red" : "1px solid transparent",
        backgroundColor: bgLink || "white",
        backgroundImage: bgLink ? `url(${bgLink})` : "",
        backgroundSize: "cover",
        overflow: "hidden",
      }}>
      {renderShapes()}
    </div>
  );
};

export default Test;
