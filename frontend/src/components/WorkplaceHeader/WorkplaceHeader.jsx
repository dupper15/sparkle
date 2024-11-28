import { FaPlus } from "react-icons/fa6";
import avt from "../../assets/default-profile-icon.png";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useState } from "react";
import AddEditorForm from "../AddEditorForm/AddEditorForm";

const WorkplaceHeader = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);

  const toggleAddMember = () => {
    setIsShow((prev) => !prev);
  };

  const goHome = () => {
    navigate("/home");
  };

  const handleCreate = (data) => {
    console.log("Member added:", data);
    setIsShow(false);
  };

  return (
    <div
      className={`flex items-center justify-between w-full h-[50px] px-5 py-8 ${
        isDarkMode ? "bg-[#18191B]" : "bg-gray-200"
      }`}>
      {/* Logo và Tên App */}
      <div className='flex items-center gap-2'>
        <div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
        <div
          onClick={goHome}
          className={`text-3xl font-bold cursor-pointer ${
            isDarkMode ? "text-white" : "text-black"
          }`}>
          Sparkle
        </div>
      </div>

      {/* Các nút hành động */}
      <div className='flex items-center gap-5'>
        <div className='hidden md:flex md:items-center md:relative'>
          {[...Array(4)].map((_, index) => (
            <button
              key={index}
              className={`w-[40px] h-[40px] bg-white rounded-full cursor-pointer flex justify-center items-center absolute z-${
                50 - index * 10
              } right-${index * 4}`}>
              <img src={avt} alt='Avatar' />
            </button>
          ))}
        </div>

        <button
          onClick={toggleAddMember}
          className='w-[40px] h-[40px] bg-white font-semibold rounded-full border-2 shadow-sm cursor-pointer text-[#4335DE] flex justify-center items-center p-2 hover:bg-slate-200'>
          <FaPlus className='w-[30px] h-[30px]' />
        </button>
        {isShow && (
          <>
            <div
              className='fixed inset-0 bg-black bg-opacity-50 z-[9998]'
              onClick={() => setIsShow(false)}></div>
            <div className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-[9999]'>
              <AddEditorForm
                childCloseFormRequest={() => setIsShow(false)}
                onCreate={(data) => handleCreate(data)}
              />
            </div>
          </>
        )}

        <button className='w-[100px] h-[40px] bg-gradient font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2'>
          <span className='text-white'>Download</span>
        </button>

        <button className='w-[100px] h-[40px] bg-white font-semibold rounded-lg border-2 border-black shadow-sm cursor-pointer text-black flex justify-center items-center p-2 hover:bg-slate-200'>
          <span className='gradient'>Share</span>
        </button>
      </div>
    </div>
  );
};

export default WorkplaceHeader;
