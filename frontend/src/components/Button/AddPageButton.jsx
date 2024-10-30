import React from "react";

const AddPageButton = ({ addPage }) => {
  return (
    <button
      onClick={addPage}
      className='bg-[#610BEF] text-white rounded-2xl h-10 w-[500px] font-bold text-xl hover:bg-[#9363e0]'>
      Add page
    </button>
  );
};

export default AddPageButton;
