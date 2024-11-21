import { useDarkMode } from "../../contexts/DarkModeContext";

const Text = ({ addNewText }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="grid grid-cols-1 gap-2">
      <div
        onClick={addNewText}
        className={`bg-transparent border-2 cursor-pointer hover font-bold p-3 rounded-md text-x1 ${
          isDarkMode
            ? "border-gray-200 hover:bg-[#3c3c3d] text-white"
            : "border-[#3c3c3d] hover:bg-gray-200 text-black"
        }`}>
        <h2>Add new text</h2>
      </div>
    </div>
  );
};

export default Text;
