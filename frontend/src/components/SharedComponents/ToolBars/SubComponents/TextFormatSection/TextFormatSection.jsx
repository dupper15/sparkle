import {FaBold, FaCircle, FaItalic, FaUnderline} from "react-icons/fa";
import ColorPickerPanel from "../../../ColorPickerPanel/ColorPickerPanel.jsx";
// eslint-disable-next-line no-unused-vars
import React from "react";

/* eslint-disable react/prop-types */
const TextFormatSection = ({
                               isBold,
                               isItalic,
                               isUnderlined,
                               activeColor,
                               setActiveColor,
                               handleColorChange,
                               handleFontWeightChange,
                               handleFontStyleChange,
                               handleTextDecorationLineChange,
                               activeTab,
                               setActiveTab,
                           }) => {
    const handleCloseColorPickerPanel = () => {
        setActiveTab("");
    }
    return (<div>
        <div className='h-8 toolbar flex'>
            {/* Color Selector */}
            <div className='h-8 toolbar flex'>
                <button
                    style={{color: activeColor}}
                    className={`text-xl rounded text-gray-700 pl-1 pr-1 mr-1 ${activeTab === "color" ? "bg-purple-200 text-purple-700" : ""}`}
                    onClick={() => {
                        setActiveTab(activeTab === "color" ? "" : "color");
                    }}>
                    <FaCircle/>
                </button>
            </div>
            <div
                className={"fixed top-1/2 left-1/2 translate-x-[0%] translate-y-[10%] "}>
                {activeTab === "color" && (<ColorPickerPanel
                    colorPanelCloseRequest={handleCloseColorPickerPanel}
                    activeColor={activeColor}
                    setActiveColor={setActiveColor}
                    handleColorChange={handleColorChange}
                />)}
            </div>

            <button
                className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isBold ? "bg-purple-200 text-purple-700" : ""}`}
                onClick={() => {
                    setActiveTab("");
                    handleFontWeightChange(isBold ? "normal" : "bold");
                }}>
                <FaBold/>
            </button>
            <button
                className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isItalic ? "bg-purple-200 text-purple-700" : ""}`}
                onClick={() => {
                    setActiveTab("");
                    handleFontStyleChange(isItalic ? "normal" : "italic");
                }}>
                <FaItalic/>
            </button>
            <button
                className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isUnderlined ? "bg-purple-200 text-purple-700" : ""}`}
                onClick={() => {
                    setActiveTab("");
                    handleTextDecorationLineChange(isUnderlined ? "none" : "underline");
                }}>
                <FaUnderline/>
            </button>
        </div>
    </div>);
};

export default TextFormatSection;
