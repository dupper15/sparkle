import { useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import {
  RiBringForward,
  RiBringToFront,
  RiSendBackward,
  RiSendToBack,
} from "react-icons/ri";

/* eslint react/prop-types: 0 */
const PositionEditSection = ({
  handleSendBackward,
  handleSendToBack,
  handleSendForward,
  handleSendToFront,
  activeTab,
  setActiveTab,
}) => {
  const [isPositionMenuOpen, setIsPositionMenuOpen] = useState(false);

  const handleLayerClick = () => {
    setIsPositionMenuOpen(!isPositionMenuOpen);
  };

  return (
    <div className="relative toolbar flex h-8">
      <button
        className={`text-xl rounded text-gray-700 dark:text-gray-200 pr-2 pl-2 mr-1 ${
          activeTab === "layer"
            ? "bg-orange-200 text-orange-700 dark:bg-orange-700 dark:text-orange-200"
            : ""
        }`}
        onClick={() => {
          handleLayerClick();
          setActiveTab(activeTab === "layer" ? "" : "layer");
        }}>
        <FaLayerGroup />
      </button>
      {activeTab === "layer" && (
        <div className="absolute top-[6rem] right-[1rem] translate-x-[50%] translate-y-[-55%] shadow">
          <PositionMenu
            onSendBackward={handleSendBackward}
            onSendToBack={handleSendToBack}
            onSendForward={handleSendForward}
            onSendToFront={handleSendToFront}
          />
        </div>
      )}
    </div>
  );
};

const PositionMenu = ({
  onSendBackward,
  onSendToBack,
  onSendForward,
  onSendToFront,
}) => {
  return (
    <div className="inline-flex bg-white dark:bg-black dark:text-gray-300 profile-dropdown box-border rounded-2xl text-sm text-gray-700">
      <div className="flex flex-col space-y-2 px-4 py-1">
        <button
          className="flex items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onSendBackward}>
          <RiSendBackward className="h-6 w-6 mr-2" />
          <span>Send Backward</span>
        </button>
        <button
          className="flex items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onSendToBack}>
          <RiSendToBack className="h-6 w-6 mr-2" />
          <span>Send To Back</span>
        </button>
      </div>
      <div className="flex flex-col space-y-2 pr-4 py-1">
        <button
          className="flex items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onSendForward}>
          <RiBringForward className="h-6 w-8 mr-2" />
          <span>Send Forward</span>
        </button>
        <button
          className="flex items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={onSendToFront}>
          <RiBringToFront className="h-6 w-8 mr-2" />
          <span>Send to Front</span>
        </button>
      </div>
    </div>
  );
};

export default PositionEditSection;
