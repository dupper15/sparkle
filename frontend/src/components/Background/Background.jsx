import { useEffect, useState } from "react";
import * as BackgroundService from "../../services/BackgroundService";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as Alert from "../Alert/Alert";
import { FaRegTrashCan } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
const Background = ({ setBackground }) => {
  const user = useSelector((state) => state.user);
  const [backgrounds, setBackgrounds] = useState([]); // State lưu trữ danh sách backgrounds
  const [isUploading, setIsUploading] = useState(false); // State để theo dõi trạng thái upload
  const [hoveredBackground, setHoveredBackground] = useState(null); // State lưu background đang được hover
  const [refresh, setRefresh] = useState(false);

  const fetchBackgrounds = async () => {
    try {
      const data = await BackgroundService.getAllBackground(user?.id);
      const fetchedBackgrounds = Array.isArray(data.data) ? data.data : [];
      const defaultBackground = {
        _id: "default",
        background_url: "",
      };
      setBackgrounds([defaultBackground, ...fetchedBackgrounds]);
    } catch (error) {
      console.error("Failed to fetch backgrounds:", error);
    }
  };

  useEffect(() => {
    fetchBackgrounds();
  }, [user?.id, refresh]);

  const mutationCreate = useMutationHooks((data) => {
    return BackgroundService.createBackground(data);
  });

  const handleUploadBackground = async (event) => {
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

      setBackgrounds((prevBackgrounds) => [
        ...prevBackgrounds,
        result.secure_url,
      ]);
      await fetchBackgrounds();
      Alert.success("Upload background success");
    } catch (error) {
      Alert.error("Failed to upload image. Please try again.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClickBackground = (bgLink) => {
    setBackground(bgLink);
  };
  const mutationDelete = useMutation({
    mutationFn: (bgId) => BackgroundService.deleteBackground(bgId),
    onSuccess: (data) => {
      Alert.success(data.message);
      setRefresh(!refresh);
    },
    onError: (error) => {
      Alert.error("Failed to delete background");
      console.error(error);
    },
  });
  const handleDeleteBackground = (bgId) => {
    console.log("bg id", bgId);
    mutationDelete.mutate(bgId);
  };
  return (
    <div className='flex flex-col h-full relative'>
      {/* Nút Upload */}
      <div className='w-full  p-2 flex justify-center items-center bg-[#4335DE] rounded-md text-white mb-3'>
        {isUploading ? (
          <ClipLoader size={20} color='white' />
        ) : (
          <label className='text-center cursor-pointer' htmlFor='image'>
            Upload
          </label>
        )}
        <input
          type='file'
          id='image'
          className='hidden'
          onChange={handleUploadBackground}
        />
      </div>

      {/* Grid hiển thị backgrounds */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full h-max overflow-y-auto pb-20 scrollbar-hide image-container'>
        {backgrounds.map((background, i) => (
          <div
            key={background._id || `default-${i}`}
            className={`relative w-full aspect-square rounded-md cursor-pointer group ${
              background._id === "default" ? "border border-slate-400" : ""
            }`}
            style={{
              backgroundImage: background.background_url
                ? `url(${background.background_url})`
                : "none",
              backgroundSize: "100% 100%",
              backgroundColor: background.background_url
                ? "transparent"
                : "white",
            }}
            onMouseEnter={() => setHoveredBackground(background._id)}
            onMouseLeave={() => setHoveredBackground(null)}
            onClick={() => handleClickBackground(background.background_url)}>
            {/* Hiển thị icon thùng rác khi hover */}
            {hoveredBackground === background._id &&
              background._id !== "default" && (
                <div
                  className='absolute top-2 right-2 text-red-500 bg-white p-1 rounded-full cursor-pointer hover:bg-gray-200'
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn click bubble lên parent
                    handleDeleteBackground(background._id);
                  }}>
                  <FaRegTrashCan size={20} />
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Background;
