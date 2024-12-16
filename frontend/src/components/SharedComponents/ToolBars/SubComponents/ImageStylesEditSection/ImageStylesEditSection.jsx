// eslint-disable-next-line no-unused-vars
import React from "react";
import { FaCircle } from "react-icons/fa";
import ColorPickerPanel from "../../../ColorPickerPanel/ColorPickerPanel.jsx";

/* eslint-disable react/prop-types */
const ImageStylesEditSection = ({
                                    openColorPickerPanel,
                                    handleColorClick,
                                    setOpenPickerPanel,
                                    activeColor,
                                    setActiveColor,
                                    handleColorChange,
                                }) => {
    return (
        <div>
            <div className="h-8 toolbar flex">
                <button style={{color: activeColor}} className={`text-xl pl-1 pr-1 mr-1`} onClick={handleColorClick}>
                    <FaCircle/>
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
        </div>
    );
};

export default ImageStylesEditSection;