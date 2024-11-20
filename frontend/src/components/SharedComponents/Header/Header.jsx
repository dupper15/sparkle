import { useState } from "react";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../../assets/default-profile-icon.png";
import UserProfileMenu from "../UserProfileMenu/UserProfileMenu.jsx";

import CustomizeSizeDialogue from "../../dialogs/CustomizeSizeDialogue.jsx";

const Header = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openCustomizeSizeDialogue, setOpenCustomizeSizeDialogue] =
    useState(false);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };
  const handleCreate = (designData) => {
    navigate("/edit", { state: designData });
    setOpenCustomizeSizeDialogue(false);
  };

  return (
    <div className="flex items-center justify-between w-full h-[50px] px-5 py-8 bg-[#18191B]">
      <div className="flex items-center justify-items-start gap-2">
        <div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
        <div
          onClick={goHome}
          className="text-3xl text-white font-bold hover:cursor-pointer">
          Sparkle
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 px-3 py-10">
        <button
          className="w-[160px] h-[40px] bg-gradient font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2"
          onClick={() => setOpenCustomizeSizeDialogue((prev) => !prev)}>
          <span className=" text-white"> Create a design</span>
        </button>
        {openCustomizeSizeDialogue && (
          <div className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            <CustomizeSizeDialogue
              childCloseFormRequest={setOpenCustomizeSizeDialogue}
              onCreate={(data) => handleCreate(data)}
            />
          </div>
        )}
        <div className="rounded-full p-2 h-[64px] w-[64px]">
          <input
            type="image"
            className="object-cover w-full h-full rounded-full"
            src={profileIcon}
            alt="Profile Image"
            onClick={() => setOpenProfile((prev) => !prev)}
          />
        </div>
        {openProfile && (
          <div className="absolute top-[4rem] right-[1.5rem] padding-[15px]">
            <UserProfileMenu />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
