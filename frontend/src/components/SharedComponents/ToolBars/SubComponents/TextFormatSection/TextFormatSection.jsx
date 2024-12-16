import { FaBold, FaCircle, FaItalic, FaUnderline } from "react-icons/fa";
import ColorPickerPanel from "../../../ColorPickerPanel/ColorPickerPanel.jsx";
// eslint-disable-next-line no-unused-vars
import React from "react";

/* eslint-disable react/prop-types */
const TextFormatSection = ({
                               isBold,
                               isItalic,
                               isUnderlined,
                               openColorPickerPanel,
                               setOpenPickerPanel,
                               activeColor,
                               setActiveColor,
                               handleColorClick,
                               handleColorChange,
                               handleFontWeightChange,
                               handleFontStyleChange,
                               handleTextDecorationLineChange,
                           }) => {
    return (
        <div>
            <div className="h-8 toolbar flex">
                {/* Color Selector */}
                <div className="h-8 toolbar flex">
                    <button className="text-xl text-amber-950 pl-1 pr-1 mr-1" onClick={handleColorClick}>
                        <FaCircle />
                    </button>
                </div>
                <div className={'fixed top-1/2 left-1/2 translate-x-[120%] '}>
                    {openColorPickerPanel && (
                        <ColorPickerPanel
                            colorPanelCloseRequest={setOpenPickerPanel}
                            activeColor={activeColor}
                            setActiveColor={setActiveColor}
                            handleColorChange={handleColorChange}
                        />
                    )}
                </div>

                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isBold ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={() => handleFontWeightChange(isBold ? 'normal' : 'bold')}
                >
                    <FaBold />
                </button>
                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isItalic ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={() => handleFontStyleChange(isItalic ? 'normal' : 'italic')}
                >
                    <FaItalic />
                </button>
                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isUnderlined ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={() => handleTextDecorationLineChange(isUnderlined ? 'none' : 'underline')}
                >
                    <FaUnderline />
                </button>
            </div>
        </div>
    );
};

export default TextFormatSection;