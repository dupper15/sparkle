import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../../assets/default-profile-icon.png";
import UserProfileMenu from "../UserProfileMenu/UserProfileMenu.jsx";
import * as Alert from "../../Alert/Alert.jsx";
import CustomizeSizeDialogue from "../../dialogs/CustomizeSizeDialogue.jsx";
import { useDarkMode } from "../../../contexts/DarkModeContext.jsx";
import { useSelector } from "react-redux";

const Header = () => {
  const { isDarkMode } = useDarkMode();
  const [image, setImage] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [openCustomizeSizeDialogue, setOpenCustomizeSizeDialogue] =
    useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setImage(user?.image || profileIcon);
  }, [user?.image]);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  const handleCreate = (designData) => {
    Alert.success("Create project successfully!");
    //navigate("/edit", { state: designData });
  };

  return (
    <div
      className={`flex items-center justify-between w-full h-[80px] px-5 py-4 transition-colors duration-500 ${
        isDarkMode ? "bg-black" : "bg-slate-100"
      }`}>
      {/* Logo và tiêu đề */}
      <div className='flex items-center gap-2'>
        <div className="rounded-full p-1 h-[60px] w-[60px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
        <div
          onClick={goHome}
          className='text-xl md:text-2xl lg:text-4xl font-bold hover:cursor-pointer gradient'>
          Sparkle
        </div>
      </div>

      {/* Phần giữa: Nút và ảnh đại diện */}
      <div className='flex items-center gap-3 md:gap-5 px-3 py-4'>
        {/* Nút tạo thiết kế */}
        <button
          className='w-[120px] md:w-[140px] lg:w-[160px] h-[50px] bg-gradient font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2'
          onClick={() => setOpenCustomizeSizeDialogue((prev) => !prev)}>
          <span className='text-sm md:text-lg text-white'>Create a design</span>
        </button>

        {openCustomizeSizeDialogue && (
          <>
            <div
              className='fixed inset-0 bg-black bg-opacity-50 z-10'
              onClick={() => setOpenCustomizeSizeDialogue(false)}></div>
            <div className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20'>
              <CustomizeSizeDialogue
                childCloseFormRequest={() =>
                  setOpenCustomizeSizeDialogue(false)
                }
                onCreate={(data) => handleCreate(data)}
              />
            </div>
          </>
        )}

        {/* Ảnh đại diện */}
        <div className='rounded-full p-1 h-[60px] w-[60px] md:h-[56px] md:w-[56px] lg:h-[64px] lg:w-[64px]'>
          <input
            type='image'
            className='object-cover w-full h-full rounded-full'
            src={image}
            alt='Profile Image'
            onClick={() => setOpenProfile((prev) => !prev)}
          />
        </div>
        {openProfile && (
          <div className='absolute top-[5rem] right-[1rem] z-[100]'>
            <UserProfileMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
