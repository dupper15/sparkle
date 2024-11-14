const Text = ({ addNewText }) => {
  return (
    <div className='grid grid-cols-1 gap-2'>
      <div
        onClick={addNewText}
        className='bg-transparent border-2 hover:bg-[#3c3c3d] border-[#3c3c3d]  cursor-pointer hover font-bold p-3 rounded-md text-white text-x1'>
        <h2>Add new text</h2>
      </div>
    </div>
  );
};

export default Text;
