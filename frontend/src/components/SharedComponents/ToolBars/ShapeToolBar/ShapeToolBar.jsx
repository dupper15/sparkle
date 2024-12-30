import React from "react";
import { RxDividerVertical } from "react-icons/rx";
import PositionEditSection from "../SubComponents/PositionEditSection/PositionEditSection.jsx";
import ImageStylesEditSection from "../SubComponents/ImageStylesEditSection/ImageStylesEditSection.jsx";
import ImageTransformationSection from "../SubComponents/ImageTransformationSection/ImageTransformationSection.jsx";
import useShapeToolbarViewModel from "./ShapeToolBarViewModel.js";
import OpacitySlider from "../SubComponents/OpacitySlider/OpacitySlider.jsx";

/* eslint react/prop-types: 0 */
const ShapeToolBar = ({
  selectedComponentColor,
  selectedComponentOpacity,
  selectedComponentHorizontalFlip,
  selectedComponentVerticalFlip,
  handleColorChange,
  handleSendBackward,
  handleSendToBack,
  handleSendForward,
  handleSendToFront,
  handleComponentOpacityChange,
  handleComponentHorizontalFlip,
  handleComponentVerticalFlip,
}) => {
  const {
    setOpenPickerPanel,
    setActiveColor,
    setIsFlipMenuOpen,
    setOpenCropMode,
    activeTab,
    setActiveTab,
  } = useShapeToolbarViewModel();

  return (
    <div className="toolbar h-[48px] inline-flex items-center space-x-2 bg-white dark:bg-black text-black dark:text-white p-2 rounded-lg shadow-md">
      <ImageStylesEditSection
        setOpenPickerPanel={setOpenPickerPanel}
        activeColor={selectedComponentColor}
        setActiveColor={setActiveColor}
        handleColorChange={handleColorChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <RxDividerVertical />

      <OpacitySlider
        currentOpacity={selectedComponentOpacity}
        handleComponentOpacityChange={handleComponentOpacityChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <RxDividerVertical />

      <ImageTransformationSection
        selectedComponentHorizontalFlip={selectedComponentHorizontalFlip}
        selectedComponentVerticalFlip={selectedComponentVerticalFlip}
        setIsFlipMenuOpen={setIsFlipMenuOpen}
        setOpenCropMode={setOpenCropMode}
        handleHorizontalFlipClick={handleComponentHorizontalFlip}
        handleVerticalFlipClick={handleComponentVerticalFlip}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <RxDividerVertical />

      <PositionEditSection
        handleSendBackward={handleSendBackward}
        handleSendToBack={handleSendToBack}
        handleSendForward={handleSendForward}
        handleSendToFront={handleSendToFront}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default ShapeToolBar;
