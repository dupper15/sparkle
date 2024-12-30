import { LuHome, LuLayoutTemplate, LuNewspaper } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../../contexts/DarkModeContext";

const Sidebar = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`w-[80px] lg:w-[100px] h-full overflow-y-auto ${
        isDarkMode ? "bg-black text-white" : "bg-slate-50 text-black"
      } flex flex-col items-center py-4`}>
      <Link
        to="../home"
        className="w-full h-[70px] lg:h-[80px] flex flex-col items-center justify-center gap-1 hover:text-orange-500 transition-colors duration-300">
        <span className="text-2xl lg:text-3xl">
          <LuHome />
        </span>
        <span className="text-xs md:text-sm lg:text-base">Home</span>
      </Link>

      <Link
        to="../project"
        className="w-full h-[70px] lg:h-[80px] flex flex-col items-center justify-center gap-1 hover:text-orange-500 transition-colors duration-300">
        <span className="text-2xl lg:text-3xl">
          <LuNewspaper />
        </span>
        <span className="text-xs md:text-sm lg:text-base">Projects</span>
      </Link>

      <Link
        to="../template"
        className="w-full h-[70px] lg:h-[80px] flex flex-col items-center justify-center gap-1 hover:text-orange-500 transition-colors duration-300">
        <span className="text-2xl lg:text-3xl">
          <LuLayoutTemplate />
        </span>
        <span className="text-xs md:text-sm lg:text-base">Templates</span>
      </Link>
    </div>
  );
};

export default Sidebar;
