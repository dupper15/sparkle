import React from "react";
import { FaCircle } from "react-icons/fa";
import ColorPickerPanel from "../../../ColorPickerPanel/ColorPickerPanel.jsx";

/* eslint-disable react/prop-types */
const ImageStylesEditSection = ({
                                    setOpenPickerPanel,
                                    activeColor,
                                    setActiveColor,
                                    handleColorChange,
                                    activeTab,
                                    setActiveTab,
                                }) => {
    return (
        <div>
            <div className="h-8 toolbar flex">
                <button
                    style={{ color: activeColor }}
                    className={`text-xl rounded text-gray-700 pl-1 pr-1 mr-1 ${activeTab === 'color' ? 'bg-gray-200' : ''}`}
                    onClick={() => {
                        setActiveTab(activeTab === 'color' ? '' : 'color');
                    }}
                >
                    <FaCircle />
                </button>
            </div>
            <div className={'fixed top-1/2 left-1/2 translate-x-[0%] translate-y-[10%] '}>
                {activeTab === 'color' && (
                    <ColorPickerPanel
                        colorPanelCloseRequest={setOpenPickerPanel}
                        activeColor={activeColor}
                        setActiveColor={setActiveColor}
                        handleColorChange={handleColorChange}
                    />
                )}
            </div>
        </div>
    );
};

export default ImageStylesEditSection;