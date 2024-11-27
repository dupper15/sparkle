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
                                }) => {
    return (
        <div>
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
                    />
                )}
            </div>
        </div>
    );
};

export default ImageStylesEditSection;