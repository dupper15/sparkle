import React, { useState, useEffect } from "react";
import { useDraggable, DragOverlay } from "@dnd-kit/core";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { useSelector } from "react-redux";
import { createImageUpload, getAllImage } from "../../services/ImageService";
import * as Alert from "../Alert/Alert";
import EditImage from "./EditImage";

const Image = ({ drag }) => {
  const [draggingImage, setDraggingImage] = useState(null);
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const user = useSelector((state) => state.user);
  const [selectedImage, setSelectedImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleDragStart = (img) => {
    const imgObject = { ...img, type: "Image" };
    setDraggingImage(imgObject);
    drag(imgObject);
  };

  const fetchImages = async () => {
    try {
      const data = await getAllImage(user?.id);
      setImages(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Failed to fetch images:", error);
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

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddcjjegzf/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      await mutationCreate.mutateAsync({
        id: user?.id,
        image: result.secure_url,
      });

      setImages((prevImages) => [...prevImages, result.secure_url]);
      await fetchImages();

      Alert.success("Upload image success");
    } catch (error) {
      Alert.error("Failed to upload image. Please try again.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // Xử lý khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".image-container")) {
        setSelectedImage("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const ImagePalette = ({ onDragStart, onSelectImage }) => {
    return (
      <div className="grid grid-cols-3 gap-2 w-full image-container">
        {images.map((img, i) => (
          <DraggableImage
            key={img._id || i}
            img={img}
            onDragStart={onDragStart}
            onSelectImage={onSelectImage}
            isSelected={selectedImage === img.image}
          />
        ))}
      </div>
    );
  };

  return isEdit ? (
    <EditImage
      setIsEdit={setIsEdit}
      imageLink={selectedImage}
      fetchImages={fetchImages}
    />
  ) : (
    <div className="overflow-y-auto h-full relative">
      <div className="w-full h-[40px] flex justify-center items-center bg-orange-500 rounded-md text-white mb-3">
        <label
          className="text-center cursor-pointer font-bold"
          htmlFor="uploadImage">
          Upload Image
        </label>
        <input
          type="file"
          id="uploadImage"
          className="hidden"
          onChange={handleUpload}
        />
      </div>
      <ImagePalette
        onDragStart={handleDragStart}
        onSelectImage={(img) => {
          setSelectedImage(img.image);
        }}
      />
      <DragOverlay>
        {draggingImage ? (
          <div
            style={{
              width: "90px",
              height: "90px",
              backgroundImage: `url(${draggingImage.image})`,
              backgroundSize: "cover",
            }}
          />
        ) : null}
      </DragOverlay>
      <button
        className={`${
          selectedImage ? "block" : "hidden"
        } w-full h-[40px] font-bold flex justify-center absolute bottom-20 items-center bg-orange-600 rounded-md text-white mt-10 hover:bg-orange-400`}
        onClick={() => setIsEdit(true)}>
        Edit
      </button>
    </div>
  );
};

const DraggableImage = ({ img, onDragStart, onSelectImage, isSelected }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: img._id || img.id || img.url,
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-full h-[90px] overflow-hidden rounded-md cursor-pointer ${
        isSelected ? "border-4 border-blue-500" : ""
      }`}
      {...listeners}
      {...attributes}
      onMouseDown={() => {
        onDragStart(img);
        onSelectImage(img);
      }}>
      <img className="w-full h-full" src={img.image} alt="" />
    </div>
  );
};

export default Image;
