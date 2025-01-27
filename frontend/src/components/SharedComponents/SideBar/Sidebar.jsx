import { useState } from "react";
import { Link } from "react-router-dom";
import { LuHome, LuNewspaper, LuLayoutTemplate } from "react-icons/lu";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDarkMode } from "../../../contexts/DarkModeContext";

const Sidebar = () => {
  const { isDarkMode } = useDarkMode();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='relative'>
      {/* Toggle Button for Sidebar (visible on small screens) */}
      <button
        className='absolute top-1 left-1 z-50 md:hidden p-1 bg-transparent rounded text-black dark:text-white border border-black dark:border-white'
        onClick={() => setSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? (
          <AiOutlineClose size={20} className='hidden' />
        ) : (
          <AiOutlineMenu size={20} />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen md:h-full transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40 w-[80px] md:w-[80px] lg:w-[100px] overflow-y-auto ${
          isDarkMode ? "bg-black text-white" : "bg-slate-100 text-black"
        } flex flex-col items-center py-4`}>
        {/* Link: Home */}
        <Link
          to='../home'
          className='w-full h-[70px] lg:h-[80px] flex flex-col items-center justify-center gap-1 hover:text-[#610BEF] transition-colors duration-300'>
          <span className='text-2xl lg:text-3xl'>
            <LuHome />
          </span>
          <span className='text-xs md:text-sm lg:text-base'>Home</span>
        </Link>

        {/* Link: Projects */}
        <Link
          to='../project'
          className='w-full h-[70px] lg:h-[80px] flex flex-col items-center justify-center gap-1 hover:text-[#610BEF] transition-colors duration-300'>
          <span className='text-2xl lg:text-3xl'>
            <LuNewspaper />
          </span>
          <span className='text-xs md:text-sm lg:text-base'>Projects</span>
        </Link>

        {/* Link: Templates */}
        <Link
          to='../template'
          className='w-full h-[70px] lg:h-[80px] flex flex-col items-center justify-center gap-1 hover:text-[#610BEF] transition-colors duration-300'>
          <span className='text-2xl lg:text-3xl'>
            <LuLayoutTemplate />
          </span>
          <span className='text-xs md:text-sm lg:text-base'>Templates</span>
        </Link>
      </div>

      {/* Overlay (when Sidebar is open on small screens) */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden'
          onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
};

export default Sidebar;
