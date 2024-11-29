import React from "react";

// eslint-disable-next-line react/prop-types
const AddCanvasButton = ({ addCanvas }) => {
  return (
    <button
      onClick={addCanvas}
      className='bg-[#610BEF] text-white rounded-2xl h-10 w-[500px] font-bold text-xl hover:bg-[#9363e0]'>
      Add page
    </button>
  );
};

export default AddCanvasButton;
