import React from "react";
import { RxDividerVertical } from "react-icons/rx";
import FontSelector from "../SubComponents/FontSelector/FontSelector.jsx";
import FontSizeField from "../SubComponents/FontSizeField/FontSizeField.jsx";
import ParagraphFormatSection from "../SubComponents/ParagraphFormatSection/ParagraphFormatSection.jsx";
import TextFormatSection from "../SubComponents/TextFormatSection/TextFormatSection.jsx";
import PositionEditSection from "../SubComponents/PositionEditSection/PositionEditSection.jsx";
import useTextToolbarViewModel from "./TextToolbarViewModel";
import OpacitySlider from "../SubComponents/OpacitySlider/OpacitySlider.jsx";

/* eslint react/prop-types: 0 */
const TextToolbar = ({
  selectedComponentColor,
  selectedTextFontSize,
  selectedTextFontFamily,
  selectedTextFontWeight,
  selectedTextFontStyle,
  selectedTextDecorationLine,
  selectedTextTextAlign,
  selectedComponentOpacity,
  handleColorChange,
  handleSendBackward,
  handleSendToBack,
  handleSendForward,
  handleSendToFront,
  handleFontFamilyChange,
  handleFontSizeChange,
  handleFontWeightChange,
  handleFontStyleChange,
  handleTextDecorationLineChange,
  handleTextAlignChange,
  handleComponentOpacityChange,
}) => {
  const {
    openColorPickerPanel,
    setOpenPickerPanel,
    setActiveColor,
    isBold,
    isItalic,
    isUnderlined,
    handleColorClick,
    activeTab,
    setActiveTab,
  } = useTextToolbarViewModel(
    selectedTextFontWeight,
    selectedTextFontStyle,
    selectedTextDecorationLine
  );
  return (
    <div className='toolbar h-[48px] inline-flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md border'>
      {/* Font */}
      <FontSelector
        currentFontFamily={selectedTextFontFamily}
        handleFontFamilyChange={handleFontFamilyChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}></FontSelector>

      {/* Font Size */}
      <FontSizeField
        currentFontSize={selectedTextFontSize}
        handleFontSizeChange={handleFontSizeChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}></FontSizeField>

      {/* Text Formatting */}
      <TextFormatSection
        isBold={isBold}
        isItalic={isItalic}
        isUnderlined={isUnderlined}
        openColorPickerPanel={openColorPickerPanel}
        setOpenPickerPanel={setOpenPickerPanel}
        activeColor={selectedComponentColor}
        setActiveColor={setActiveColor}
        handleColorPanelCloseRequest={setOpenPickerPanel}
        handleColorChange={handleColorChange}
        handleFontWeightChange={handleFontWeightChange}
        handleFontStyleChange={handleFontStyleChange}
        handleTextDecorationLineChange={handleTextDecorationLineChange}
        handleColorClick={handleColorClick}
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

      {/* Paragraph Formatting */}
      <ParagraphFormatSection
        currentTextAlign={selectedTextTextAlign}
        handleTextAlignChange={handleTextAlignChange}
        activeTab={activeTab}
        setActiveTab={setActiveTab}></ParagraphFormatSection>

      <RxDividerVertical />

      {/* Position Edit Section */}
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

export default TextToolbar;
