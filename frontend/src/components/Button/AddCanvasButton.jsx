import React from "react";

// eslint-disable-next-line react/prop-types
const AddCanvasButton = ({ addCanvas }) => {
  return (
    <button
      onClick={addCanvas}
      className="bg-orange-400 text-white rounded-xl h-10 w-[400px] sm:w-[400px] md:w-[500px] font-bold text-lg md:text-xl hover:bg-orange-500 px-4">
      Add page
    </button>
  );
};

export default AddCanvasButton;
