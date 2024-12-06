import { useEffect, useState } from "react";
import * as BackgroundService from '../../services/BackgroundService';
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as Alert from "../Alert/Alert"

const Background = ( {setBackground }) => {
  const user = useSelector((state) => state.user);
  const [backgrounds, setBackgrounds] = useState([]); // State lưu trữ danh sách backgrounds
  const [isUploading, setIsUploading] = useState(false); // State để theo dõi trạng thái upload

  const fetchBackgrounds = async () => {
    try {
      const data = await BackgroundService.getAllBackground(user?.id);
      setBackgrounds(Array.isArray(data.data) ? data.data : []); // Gán dữ liệu background
    } catch (error) {
      console.error("Failed to fetch backgrounds:", error);
    }
  };

  useEffect(() => {
    fetchBackgrounds();
  }, [user?.id]);

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

      const response = await fetch("https://api.cloudinary.com/v1_1/ddcjjegzf/image/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      await mutationCreate.mutateAsync({
        id: user?.id,
        image: result.secure_url,
      });

      
      setBackgrounds((prevBackgrounds) => [...prevBackgrounds, result.secure_url]);
      await fetchBackgrounds();
      
      Alert.success("Upload background success")
    } catch (error) {
      Alert.error("Failed to upload image. Please try again.")
      console.error(error);
    } finally {
      setIsUploading(false); 
    }
  };

  const handleClickBackground = (bgLink) => {
    setBackground(bgLink);
  };

  return (
    <div className="pt-4">
      {/* Nút Upload */}
      <div className="w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-md text-white mb-3">
        <label className="text-center cursor-pointer" htmlFor="image">Upload Background</label>
        <input type="file" id="image" className="hidden" onChange={handleUploadBackground} />
      </div>
      
      {/* Grid hiển thị backgrounds */}
       <div className='grid grid-cols-2 gap-2 mt-5 w-full'>
        {backgrounds.map((background, i) => (
          <div
            key={i}
            className="w-full h-[90px] rounded-md cursor-pointer"
            style={{
              backgroundImage: `url(${background.background_url})`,
              backgroundSize: "cover",
              backgroundColor: background.background_url ? "transparent" : "white",
            }}
            onClick={() => handleClickBackground(background.background_url)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Background;
