import { useState } from "react";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import template from "../../assets/bg-dm.png"; // Đảm bảo đúng đường dẫn tới ảnh

const Image = ({ drag }) => {
  const [draggingImage, setDraggingImage] = useState(null);
  const [images, setImages] = useState([
    { id: 1, url: template },
    { id: 2, url: template },
    { id: 3, url: template },
    { id: 4, url: template },
    { id: 5, url: template },
    { id: 6, url: template },
  ]);
  const handleDragStart = (img) => {
    const imgObject = { backgroundImage: img.url || template, id: img.id };
    setDraggingImage(imgObject);
    drag(imgObject);
  };
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = {
        id: images.length + 1,
        url: URL.createObjectURL(file),
      };
      setImages((prevImages) => [...prevImages, newImage]);
    }
  };

  return (
    <div>
      <div className='w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-md text-white mb-3'>
        <label className='text-center cursor-pointer' htmlFor='uploadImage'>
          Upload Image
        </label>
        <input
          type='file'
          id='uploadImage'
          className='hidden'
          onChange={handleUpload}></input>
      </div>
      <div className='grid grid-cols-3 gap-2 w-full'>
        {images.map((img, i) => (
          <DraggableImage
            key={img.id || i}
            img={img}
            onDragStart={handleDragStart}
          />
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
    id: img?.id ? img.id.toString() : "default",
  });

  return (
    <div
      ref={setNodeRef}
      className='w-full h-[90px] overflow-hidden rounded-md cursor-pointer'
      {...listeners}
      {...attributes}
      onMouseDown={() => onDragStart(img)}>
      <img className='w-full h-full' src={img.url} alt='' />
    </div>
  );
};

export default Image;
