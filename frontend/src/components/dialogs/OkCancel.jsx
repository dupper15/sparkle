/* eslint-disable react/prop-types */
import { VscError } from "react-icons/vsc";

const OkCancel = ({ title, funOk, funCancel }) => {
  return (
    <div className='fixed inset-0 w-full h-full z-10 flex justify-center items-center transition-transform '>
      <div className='absolute inset-0 bg-black opacity-70'></div>
      <div className='relative w-[400px] h-[250px] bg-white rounded-md flex items-center justify-center flex-col gap-2'>
        <VscError className='text-[#FB1D1D] w-20 h-20' />
        <p className='text-custom-blue font-extrabold text-4xl'>Error!</p>
        <div className='text-custom-blue text-sm'>
          <p>{title}</p>
        </div>
        <div className=' w-full flex items-center justify-center gap-10 mt-2'>
          <button
            className='text-white items-center  bg-[#FB1D1D] rounded-lg shadow-md  shadow-red-500  w-1/4 h-10'
            onClick={funOk}>
            Ok
          </button>
          <button
            className='items-center bg-white rounded-xl border-2 border-gray-100 text-[#FB1D1D] shadow-xl w-1/4 h-10'
            onClick={funCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OkCancel;
