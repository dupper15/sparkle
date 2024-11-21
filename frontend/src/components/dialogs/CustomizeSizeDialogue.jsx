import { useState } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

// eslint-disable-next-line react/prop-types
const CustomizeSizeDialogue = ({ childCloseFormRequest, onCreate }) => {
  const { isDarkMode } = useDarkMode();

  const [state, setState] = useState({
    nameProject: "",
    width: "",
    height: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const create = () => {
    if (state.name && parseInt(state.width) > 0 && parseInt(state.height) > 0) {
      onCreate({
        nameProject: state.nameProject,
        type: "create",
        width: parseInt(state.width),
        height: parseInt(state.height),
      });
      childCloseFormRequest(false);
    } else {
      alert("Please fill out !!!");
    }
  };

  return (
    <div
      className={`relative h-[400px] w-[600px] flex-column items-center justify-center p-6 rounded-lg shadow-lg text-center ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}>
      <button
        className="absolute top-2 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        onClick={() => childCloseFormRequest(false)}>
        ×
      </button>
      <h2
        className={`text-lg font-semibold mb-6 ${
          isDarkMode ? "text-white" : "text-black"
        }`}>
        Customize size
      </h2>
      <div>
        <input
          name="name"
          onChange={inputHandle}
          type="text"
          placeholder="Enter name..."
          className={`w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
      <div>
        <input
          name="width"
          onChange={inputHandle}
          type="number"
          placeholder="Enter width..."
          className={`w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
      <div>
        <input
          name="height"
          onChange={inputHandle}
          type="number"
          placeholder="Enter height..."
          className={`w-full p-3 mb-4 border-2 border-indigo-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
      </div>
      <button
        onClick={create}
        className="w-[120px] py-3 mt-4 font-bold text-white rounded-md bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90">
        Create
      </button>
    </div>
  );
};

export default CustomizeSizeDialogue;
