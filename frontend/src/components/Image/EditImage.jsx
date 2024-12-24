import React, { useRef, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as ImageService from "../../services/ImageService";
import { IoIosArrowBack } from "react-icons/io";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { createImageUpload } from "../../services/ImageService";
import { useSelector } from "react-redux";

const EditImage = ({ imageLink, setIsEdit, fetchImages }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [canvasCtx, setCanvasCtx] = useState(null);
  const [imageNoneBackground, setImageNoneBackground] = useState("");
  const user = useSelector((state) => state.user);

  const mutationCreate = useMutationHooks((data) => {
    return createImageUpload(data);
  });
  const mutation = useMutation({
    mutationFn: ({ imageLink }) => {
      return ImageService.removeBackground(imageLink);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setImageNoneBackground(data);
    },
  });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setCanvasCtx(ctx);

    const img = new Image();
    img.src = imageLink;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      ctx.drawImage(img, 0, 0, 400, 400);
      imageRef.current = img;
    };

    img.onerror = () => {
      console.error("Failed to load image. Check the path.");
    };
  }, []);
  useEffect(() => {
    if (imageNoneBackground) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = imageNoneBackground;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [imageNoneBackground]);
  const applyFilters = () => {
    if (!canvasCtx || !imageRef.current) return;
    const brightness = parseFloat(document.getElementById("brightness").value);
    const contrast = parseFloat(document.getElementById("contrast").value);
    const saturation = parseFloat(document.getElementById("saturation").value);
    const red = parseFloat(document.getElementById("red").value);
    const green = parseFloat(document.getElementById("green").value);
    const blue = parseFloat(document.getElementById("blue").value);
    const alpha = parseFloat(document.getElementById("alpha").value);
    const canvas = canvasRef.current;
    canvasCtx.drawImage(imageRef.current, 0, 0, 400, 400);
    const imageData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      let a = data[i + 3];
      r += brightness * 255;
      g += brightness * 255;
      b += brightness * 255;
      a += brightness * 255;

      const normalizedContrast = (contrast + 1) * 128;
      const contrastFactor =
        (259 * (normalizedContrast + 255)) / (255 * (259 - normalizedContrast));
      r = contrastFactor * (r - 128) + 128;
      g = contrastFactor * (g - 128) + 128;
      b = contrastFactor * (b - 128) + 128;

      const gray = 0.3 * r + 0.59 * g + 0.11 * b;
      r = gray * (1 - saturation) + r * saturation;
      g = gray * (1 - saturation) + g * saturation;
      b = gray * (1 - saturation) + b * saturation;
      a = gray * (1 - saturation) + a * saturation;

      r += red * 255;
      g += green * 255;
      b += blue * 255;
      a += alpha * 255;

      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
      data[i + 3] = Math.min(255, Math.max(0, a));
    }

    canvasCtx.putImageData(imageData, 0, 0);
  };
  const handleSubmit = (imageLink) => {
    mutation.mutate({ imageLink });
  };
  const handleRestore = () => {
    setImageNoneBackground("");
    if (canvasCtx && imageRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 200;
      canvas.height = 200;

      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      canvasCtx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
    }
    const controls = [
      { id: "brightness", defaultValue: 0 },
      { id: "contrast", defaultValue: -1 },
      { id: "saturation", defaultValue: 1 },
      { id: "red", defaultValue: 0 },
      { id: "green", defaultValue: 0 },
      { id: "blue", defaultValue: 0 },
      { id: "alpha", defaultValue: 0 },
    ];

    controls.forEach((control) => {
      const input = document.getElementById(control.id);
      if (input) {
        input.value = control.defaultValue;
      }
    });
  };
  const handleApply = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found");
      return;
    }

    try {
      // Sử dụng toDataURL nếu toBlob không khả dụng
      const dataURL = canvas.toDataURL("image/png");
      const blob = await fetch(dataURL).then((res) => res.blob());

      if (!blob) {
        console.error("Failed to generate blob from canvas");
        return;
      }

      // Chuẩn bị dữ liệu để upload
      const uploadPreset = "afh5sfc";
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", uploadPreset);

      // Gửi yêu cầu upload lên Cloudinary
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddcjjegzf/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!result.secure_url) {
        console.error("Failed to upload image to Cloudinary", result);
        return;
      }

      await mutationCreate.mutateAsync({
        id: user?.id,
        image: result.secure_url,
      });

      console.log("Image uploaded successfully: ", result.secure_url);

      fetchImages();
      setIsEdit(false);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <div className='flex flex-col overflow-y-scroll'>
      <div className='flex gap-4 items-center'>
        <IoIosArrowBack
          onClick={() => setIsEdit(false)}
          className='text-xl cursor-pointer hover:text-slate-200'
        />
        <h1 className='text-slate-800 text-xl font-semibold'>
          Edit your image
        </h1>
      </div>
      <div className='relative group'>
        <canvas
          ref={canvasRef}
          className='w-full h-[200px] border border-black rounded-md my-4 transition-all duration-300 group-hover:opacity-50'></canvas>
        <div className='absolute inset-0 h-[200px] my-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white font-bold rounded-md'>
          <button
            onClick={() => {
              handleSubmit(imageLink);
              console.log("imageLink", imageLink);
            }}
            className='flex justify-center items-center bg-blue-500 rounded-md text-white p-3 hover:bg-blue-400'>
            Remove background
          </button>
        </div>
      </div>
      <div className='controls'>
        {[
          {
            id: "brightness",
            label: "Brightness",
            min: -1,
            max: 1,
            defaultValue: 0,
          },
          {
            id: "contrast",
            label: "Contrast",
            min: -3,
            max: 1,
            defaultValue: -1,
          },
          {
            id: "saturation",
            label: "Saturation",
            min: -3,
            max: 5,
            defaultValue: 1,
          },
          { id: "red", label: "Red", min: -1, max: 1, defaultValue: 0 },
          { id: "green", label: "Green", min: -1, max: 1, defaultValue: 0 },
          { id: "blue", label: "Blue", min: -1, max: 1, defaultValue: 0 },
          { id: "alpha", label: "Alpha", min: -1, max: 1, defaultValue: 0 },
        ].map((control) => (
          <div key={control.id} className='flex flex-col overflow-y-auto'>
            <label
              className='text-base text-slate-600 mr-2'
              htmlFor={control.id}>
              {control.label}
            </label>
            <input
              className='w-full bg-gray-200 rounded-lg cursor-pointer accent-indigo-700'
              type='range'
              id={control.id}
              min={control.min}
              max={control.max}
              step='0.01'
              defaultValue={control.defaultValue}
              onChange={applyFilters}
            />
          </div>
        ))}
      </div>
      <div className='flex gap-4 items-center justify-center w-full h-max mb-16 mt-4'>
        <button
          className='w-[1/3] h-[40px] p-3 flex justify-center items-center bg-blue-600 rounded-md text-white hover:bg-blue-400'
          onClick={handleRestore}>
          Restore
        </button>
        <button
          className='w-[1/3] h-[40px] p-3  flex justify-center items-center bg-indigo-600 rounded-md text-white hover:bg-indigo-400'
          onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default EditImage;
