import React, { useState } from "react";
import { FaAdjust } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const OpacitySlider = ({
  currentOpacity,
  handleComponentOpacityChange,
  activeTab,
  setActiveTab,
}) => {
  const [openOpacitySlider, setOpenOpacitySlider] = useState(false);

  const handleIconClick = () => {
    setOpenOpacitySlider(!openOpacitySlider);
  };

  const handleInputChange = (e) => {
    let newOpacity = e.target.value;
    if (!isNaN(newOpacity) && newOpacity !== "") {
      newOpacity = Number(newOpacity);
      if (newOpacity < 0) newOpacity = 0;
      if (newOpacity > 100) newOpacity = 100;
      handleComponentOpacityChange(newOpacity / 100);
      console.log("Opacity", newOpacity);
    }
  };

  return (
    <div className="relative">
      <button
        className={`text-xl rounded text-gray-700 dark:text-gray-200 p-2 ${
          activeTab === "opacity"
            ? "bg-orange-200 text-orange-700 dark:bg-orange-700 dark:text-orange-200"
            : ""
        }`}
        onClick={() => {
          handleIconClick();
          setActiveTab(activeTab === "opacity" ? "" : "opacity");
        }}>
        <FaAdjust />
      </button>
      {activeTab === "opacity" && (
        <div className="absolute top-full translate-x-[-40%] translate-y-[0%] mt-2 p-2 bg-white dark:bg-black border rounded shadow-lg">
          <div className="flex flex-col">
            <label
              htmlFor="opacity-range"
              className="text-gray-700 dark:text-gray-200 mb-2">
              Opacity:
            </label>
            <div className="flex items-center w-full">
              <input
                type="range"
                id="opacity-range"
                min="0"
                max="1"
                step="0.01"
                value={currentOpacity}
                onChange={(e) => handleComponentOpacityChange(e.target.value)}
                className="flex-grow mr-2"
                style={{
                  appearance: "none",
                  WebkitAppearance: "none",
                  height: "4px",
                  borderRadius: "4px",
                  background: `linear-gradient(to right, #ea580c ${
                    currentOpacity * 100
                  }%, #d3d3d3 ${currentOpacity * 100}%)`,
                }}
              />
              <input
                type="text"
                value={Math.round(currentOpacity * 100)}
                onChange={handleInputChange}
                className="w-16 text-center text-black bg-white dark:text-white dark:bg-black"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  appearance: "textfield",
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                }}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpacitySlider;
