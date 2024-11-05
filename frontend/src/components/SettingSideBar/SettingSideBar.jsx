import { LuSettings } from "react-icons/lu";
import { RiAccountCircleLine } from "react-icons/ri";

const SettingSideBar = () => {
  return (
    <div className='w-[55px] md:w-[70px] bg-black z-50 h-full text-white overflow-y-auto ml-1 md:ml-2 '>
      <div
        onClick={() => {}}
        className='w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] '>
        <span className='text-2xl '>
          <RiAccountCircleLine />
        </span>
        <span className='text-xs font-medium'>Account</span>
      </div>
      <div
        onClick={() => {}}
        className='w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] '>
        <span className='text-2xl'>
          <LuSettings />
        </span>
        <span className='text-xs font-medium'>Setting</span>
      </div>
    </div>
  );
};

export default SettingSideBar;
