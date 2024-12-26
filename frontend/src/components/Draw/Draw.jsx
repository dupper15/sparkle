import { FaPencil } from "react-icons/fa6";
import { FaPaintBrush } from "react-icons/fa";
import { TfiMarkerAlt } from "react-icons/tfi";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useState } from "react";

const Draw = ({ setDrawingTool }) => {
  const { isDarkMode } = useDarkMode();

  const [activeTool, setActiveTool] = useState(null);

  // Hàm xử lý khi click vào công cụ
  const handleToolClick = (tool) => {
    setActiveTool(tool);
    setDrawingTool(tool);
  };

  return (
    <div
      className={`grid grid-cols-1 gap-2 ${
        isDarkMode ? "text-white" : "text-black"
      }`}>
      {["pencil", "marker", "brush"].map((tool) => (
        <div
          key={tool}
          className="flex flex-row items-center cursor-pointer"
          onClick={() => handleToolClick(tool)}>
          <div
            className={`flex flex-row px-2 rounded-lg ${
              activeTool === tool ? "bg-gray-300" : ""
            }`}>
            {tool === "pencil" && (
              <FaPencil className="h-[30px] w-[30px] py-1" />
            )}
            {tool === "marker" && (
              <TfiMarkerAlt className="h-[30px] w-[30px] py-1" />
            )}
            {tool === "brush" && (
              <FaPaintBrush className="h-[30px] w-[30px] py-1" />
            )}
            <span className="font-semibold text-xl ml-2 capitalize">
              {tool}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Draw;
