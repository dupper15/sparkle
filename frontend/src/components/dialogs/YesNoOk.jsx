/* eslint-disable react/prop-types */
import { TiWarningOutline } from "react-icons/ti";
const YesNoOk = ({ title, funOk, funCancel }) => {
  return (
    <div className='fixed inset-0 w-full h-full z-10 flex justify-center items-center transition-transform '>
      <div className='absolute inset-0 bg-black opacity-70'></div>
      <div className='relative w-[400px] h-[250px] bg-white rounded-md flex items-center justify-center flex-col gap-2'>
        <TiWarningOutline className='text-yellow-400 w-16 h-16' />
        <p className='text-custom-blue font-extrabold text-4xl'>Error!</p>
        <div className='text-custom-blue text-sm'>
          <p>{title}</p>
        </div>
        <div className=' w-full flex items-center justify-center gap-10 mt-2'>
          <button
            className='text-white items-center  bg-yellow-400 rounded-lg shadow-md  shadow-yellow-300  w-1/4 h-10'
            onClick={funOk}>
            Ok
          </button>
          <button
            className='items-center bg-white rounded-xl border-2 border-gray-100 text-yellow-400 shadow-xl w-1/4 h-10'
            onClick={funCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default YesNoOk;