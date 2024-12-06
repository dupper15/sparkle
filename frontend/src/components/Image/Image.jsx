import { useEffect, useState } from "react";
import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useSelector } from "react-redux";
import { createImageUpload, getAllImage } from "../../services/ImageService";
import * as Alert from "../Alert/Alert"

const Image = ({ drag }) => {
  const [draggingImage, setDraggingImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const user = useSelector((state) => state.user)
  
  const handleDragStart = (img) => {
    const imgObject = { backgroundImage: img.image , id: img._id };
    setDraggingImage(imgObject);
    drag(imgObject);
  };


  const fetchImages = async () => {
    try {
      const data = await getAllImage(user?.id);
      setImages(Array.isArray(data.data) ? data.data : []); // Gán dữ liệu background
    } catch (error) {
      console.error("Failed to fetch backgrounds:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [user?.id]);

  const mutationCreate = useMutationHooks((data) => {
    return createImageUpload(data);
  });

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true); 
    try {
      const uploadPreset = "afh5sfc";
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch("https://api.cloudinary.com/v1_1/ddcjjegzf/image/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      await mutationCreate.mutateAsync({
        id: user?.id,
        image: result.secure_url,
      });

      
      setImages((prevImages) => [...prevImages, result.secure_url]);
      await fetchImages();
      
      Alert.success("Upload background success")
    } catch (error) {
      Alert.error("Failed to upload image. Please try again.")
      console.error(error);
    } finally {
      setIsUploading(false); 
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
            key={img._id || i}
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
              backgroundImage: draggingImage.image,
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
    id: img._id || img.id || img.url,
  });

  return (
    <div
      ref={setNodeRef}
      className='w-full h-[90px] overflow-hidden rounded-md cursor-pointer'
      {...listeners}
      {...attributes}
      onMouseDown={() => onDragStart(img)}>
      <img className='w-full h-full' src={img.image} alt='' />
    </div>
  );
};

export default Image;
