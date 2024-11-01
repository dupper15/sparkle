import { LuSettings } from "react-icons/lu";
import { RiAccountCircleLine } from "react-icons/ri";

const SettingSideBar = () => {
    return (
        <div className="w-[80px] z-50 h-full overflow-y-auto">
            <div onClick={() => {}} className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                <span className="text-2xl">
                    <RiAccountCircleLine />
                </span>
                <span className="text-l">Account</span>
            </div>
            <div onClick={() => {}} className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                <span className="text-2xl">
                    <LuSettings />
                </span>
                <span className="text-l">Setting</span>
            </div>
        </div>
    );
};

export default SettingSideBar;
