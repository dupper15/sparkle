import { FaPlus } from "react-icons/fa6";
import avt from "../../assets/default-profile-icon.png";
import { useNavigate } from "react-router-dom";

const WorkplaceHeader = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="flex items-center justify-between w-full h-[50px] px-5 py-8 bg-black">
      <div className="flex items-center justify-items-start gap-2">
        <div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
        <div
          onClick={goHome}
          className="text-3xl gradient font-bold cursor-pointer">
          Sparkle
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 px-3 py-10">
        <div className="hidden md:flex md:items-center md:relative">
          <button className="w-[40px] h-[40px] bg-white rounded-full cursor-pointer flex justify-center items-center absolute right-12 z-50">
            <img className="" src={avt} alt="Avatar" />
          </button>
          <button className="w-[40px] h-[40px] bg-white rounded-full cursor-pointer flex justify-center items-center absolute right-8 z-40">
            <img className="" src={avt} alt="Avatar" />
          </button>
          <button className="w-[40px] h-[40px] bg-white rounded-full cursor-pointer flex justify-center items-center absolute right-4 z-30">
            <img className="" src={avt} alt="Avatar" />
          </button>
          <button className="w-[40px] h-[40px] bg-white rounded-full cursor-pointer flex justify-center items-center absolute right-0 z-20">
            <img className="" src={avt} alt="Avatar" />
          </button>
        </div>

        <button className="w-[40px] h-[40px] bg-white font-semibold rounded-full border-2 shadow-sm cursor-pointer text-[#4335DE] flex justify-center items-center p-2 hover:bg-slate-200 ">
          <FaPlus className="w-[30px] h-[30px]" />
        </button>

        <button className="w-[100px] h-[40px] bg-gradient font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2">
          <span className="text-white">Download</span>
        </button>

        <button className="w-[100px] h-[40px] bg-white font-semibold rounded-lg border-2 border-black shadow-sm cursor-pointer text-black flex justify-center items-center p-2 hover:bg-slate-200">
          <span className="gradient"> Share</span>
        </button>
      </div>
    </div>
  );
};

export default WorkplaceHeader;
