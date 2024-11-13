import { useState } from "react";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import template from "../../assets/bg-dm.png"; // Đảm bảo đúng đường dẫn tới ảnh

const Image = ({ drag }) => {
  const [draggingImage, setDraggingImage] = useState(null);

  const handleDragStart = (img) => {
    const imgObject = { backgroundImage: template, id: img };
    setDraggingImage(imgObject);
    drag(imgObject);
  };

  return (
    <div>
      <div className='grid grid-cols-3 gap-2 w-full'>
        {[1, 2, 3, 4, 5, 6].map((img, i) => (
          <DraggableImage key={i} img={img} onDragStart={handleDragStart} />
        ))}
      </div>
      <DragOverlay>
        {draggingImage ? (
          <div
            style={{
              width: "90px",
              height: "90px",
              backgroundImage: `url(${draggingImage.backgroundImage})`,
              backgroundSize: "cover",
            }}
          />
        ) : null}
      </DragOverlay>
    </div>
  );
};

const DraggableImage = ({ img, onDragStart }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: img.toString(),
  });

  return (
    <div
      ref={setNodeRef}
      className='w-full h-[90px] overflow-hidden rounded-md cursor-pointer'
      {...listeners}
      {...attributes}
      onMouseDown={() => onDragStart(img)}>
      <img className='w-full h-full' src={template} alt='' />
    </div>
  );
};

export default Image;
