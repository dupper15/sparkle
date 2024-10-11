import { SiTicktick } from "react-icons/si";

// eslint-disable-next-line react/prop-types
const Ok = ({ title, funOk }) => {
  return (
    <div className='fixed inset-0 w-full h-full z-10 flex justify-center items-center transition-transform '>
      <div className='absolute inset-0 bg-black opacity-70'></div>
      <div className='fixed w-[400px] h-[250px] bg-white rounded-md flex items-center justify-center flex-col gap-2'>
        <SiTicktick className='text-[#34F447] w-20 h-20' />
        <p className='text-custom-blue font-extrabold text-4xl'>Error!</p>
        <div className='text-custom-blue text-sm'>
          <p>{title}</p>
        </div>
        <div className=' w-full flex items-center justify-center gap-10 mt-2'>
          <button
            className='text-white items-center  bg-[#34F447] rounded-lg shadow-md  shadow-[#85fc91]  w-1/4 h-10'
            onClick={funOk}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ok;
