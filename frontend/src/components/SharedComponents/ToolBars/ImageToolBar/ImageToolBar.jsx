import React from "react";
import { RxDividerVertical } from "react-icons/rx";
import PositionEditSection from "../SubComponents/PositionEditSection/PositionEditSection.jsx";
import ImageStylesEditSection from "../SubComponents/ImageStylesEditSection/ImageStylesEditSection.jsx";
import ImageTransformationSection from "../SubComponents/ImageTransformationSection/ImageTransformationSection.jsx";
import useImageToolbarViewModel from "./ImageToolbarViewModel";

const ImageToolbar = () => {
    const {
        openColorPickerPanel,
        handleColorClick,
        setOpenPickerPanel,
        activeColor,
        setActiveColor,
        isFlipMenuOpen,
        isCropModeOpen,
        handleFlipClick,
        handleCropClick,
        setIsFlipMenuOpen,
        setOpenCropMode,
    } = useImageToolbarViewModel();

    return (
        <div className="h-[48px] inline-flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md ">
            <ImageStylesEditSection
                openColorPickerPanel={openColorPickerPanel}
                handleColorClick={handleColorClick}
                setOpenPickerPanel={setOpenPickerPanel}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
            />

            <RxDividerVertical />

            <ImageTransformationSection
                isFlipMenuOpen={isFlipMenuOpen}
                isCropModeOpen={isCropModeOpen}
                handleFlipClick={handleFlipClick}
                handleCropClick={handleCropClick}
                setIsFlipMenuOpen={setIsFlipMenuOpen}
                setOpenCropMode={setOpenCropMode}
            />

            <RxDividerVertical />

            <PositionEditSection />
        </div>
    );
};

export default ImageToolbar;