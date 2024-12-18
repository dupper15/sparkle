import React from "react";
import {RxDividerVertical} from "react-icons/rx";
import PositionEditSection from "../SubComponents/PositionEditSection/PositionEditSection.jsx";
import ImageStylesEditSection from "../SubComponents/ImageStylesEditSection/ImageStylesEditSection.jsx";
import ImageTransformationSection from "../SubComponents/ImageTransformationSection/ImageTransformationSection.jsx";
import useShapeToolbarViewModel from "./ShapeToolBarViewModel.js";
import OpacitySlider from "../SubComponents/OpacitySlider/OpacitySlider.jsx";

/* eslint react/prop-types: 0 */
const ShapeToolBar = ({
                          selectedComponentColor,
                          selectedComponentOpacity,
                          handleColorChange,
                          handleSendBackward,
                          handleSendToBack,
                          handleSendForward,
                          handleSendToFront,
                          handleComponentOpacityChange
                      }) => {
    const {
        openColorPickerPanel,
        handleColorClick,
        setOpenPickerPanel,
        setActiveColor,
        isFlipMenuOpen,
        isCropModeOpen,
        handleFlipClick,
        handleCropClick,
        setIsFlipMenuOpen,
        setOpenCropMode,
    } = useShapeToolbarViewModel();

    return (<div className="toolbar h-[48px] inline-flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md">
        <ImageStylesEditSection
            openColorPickerPanel={openColorPickerPanel}
            handleColorClick={handleColorClick}
            setOpenPickerPanel={setOpenPickerPanel}
            activeColor={selectedComponentColor}
            setActiveColor={setActiveColor}
            handleColorChange={handleColorChange}
        />

        <RxDividerVertical/>

        <OpacitySlider currentOpacity={selectedComponentOpacity} handleComponentOpacityChange={handleComponentOpacityChange}/>

        <RxDividerVertical/>

        <ImageTransformationSection
            isFlipMenuOpen={isFlipMenuOpen}
            isCropModeOpen={isCropModeOpen}
            handleFlipClick={handleFlipClick}
            handleCropClick={handleCropClick}
            setIsFlipMenuOpen={setIsFlipMenuOpen}
            setOpenCropMode={setOpenCropMode}
        />

        <RxDividerVertical/>

        <PositionEditSection
            handleSendBackward={handleSendBackward}
            handleSendToBack={handleSendToBack}
            handleSendForward={handleSendForward}
            handleSendToFront={handleSendToFront}
        />
    </div>);
};

export default ShapeToolBar;