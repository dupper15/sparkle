import {LuHome, LuLayoutTemplate, LuNewspaper} from "react-icons/lu";
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className='w-[100px] z-50 h-full overflow-y-auto'>
            <Link to="../home"
                 className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                <span className='text-2xl'><LuHome/></span>
                <span className='text-l'>Home</span>
            </Link>
            <Link to='../project'
                 className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                <span className='text-2xl'><LuNewspaper/></span>
                <span className='text-l'>Projects</span>
            </Link>
            <Link to='../template'
                 className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                <span className='text-2xl'><LuLayoutTemplate/></span>
                <span className='text-l'>Templates</span>
            </Link>
        </div>
    )
}
export default Sidebar