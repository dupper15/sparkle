import { FaPlus } from "react-icons/fa6";

const WorkplaceHeader = () => {
    return (
      <div className='flex items-center justify-between w-full h-[50px] px-5 py-8 bg-[#18191B]' >
        <div className='flex items-center justify-items-start gap-2'>
          <div className="w-[40px] h-[40px] bg-[url('./assets/logo.png')] bg-cover bg-center" />
          <div className='text-3xl text-white font-bold'>Sparkle</div>
        </div>
        
        <div className='flex items-center justify-center gap-5 px-3 py-10'>
        <button className='w-[40px] h-[40px] bg-white font-semibold rounded-full border-2 border-black shadow-sm cursor-pointer text-black flex justify-center items-center p-2'>
        <FaPlus className='w-[30px] h-[30px]'/>
          </button>
          <button className='w-[120px] h-[40px] bg-gradient font-semibold rounded-lg shadow-sm cursor-pointer border-black flex justify-center items-center p-2'>
            <span className='text-black'> Download</span>
          </button>
          <button className='w-[120px] h-[40px] bg-white font-semibold rounded-lg border-2 border-black shadow-sm cursor-pointer text-black flex justify-center items-center p-2'>
          <span className='text-black'> Share</span>
          </button>
        </div>
      </div>
    );
  };
  
  export default WorkplaceHeader;
  