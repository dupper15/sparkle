import {LuHome, LuLayoutTemplate, LuNewspaper} from "react-icons/lu";

const HomePageSideBar = () => {
    return (
        <div className='w-[100px] z-50 h-full overflow-y-auto'>
            <div onClick={() => {
            }}
                 className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                <span className='text-2xl'><LuHome/></span>
                <span className='text-l'>Home</span>
            </div>
            <div onClick={() => {
            }}
                 className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                <span className='text-2xl'><LuNewspaper/></span>
                <span className='text-l'>Projects</span>
            </div>
            <div onClick={() => {
            }}
                 className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                <span className='text-2xl'><LuLayoutTemplate/></span>
                <span className='text-l'>Templates</span>
            </div>
        </div>
    )
}
export default HomePageSideBar