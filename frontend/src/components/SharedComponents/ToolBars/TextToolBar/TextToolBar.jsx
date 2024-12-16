import React from "react";
import {RxDividerVertical} from "react-icons/rx";
import FontSelector from "../SubComponents/FontSelector/FontSelector.jsx";
import FontSizeField from "../SubComponents/FontSizeField/FontSizeField.jsx";
import ParagraphFormatSection from "../SubComponents/ParagraphFormatSection/ParagraphFormatSection.jsx";
import TextFormatSection from "../SubComponents/TextFormatSection/TextFormatSection.jsx";
import PositionEditSection from "../SubComponents/PositionEditSection/PositionEditSection.jsx";
import useTextToolbarViewModel from "./TextToolbarViewModel";

/* eslint react/prop-types: 0 */
const TextToolbar = ({
                         selectedTextFontSize,
                         selectedTextFontFamily,
                         selectedTextFontWeight,
                         selectedTextFontStyle,
                         selectedTextDecorationLine,
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
                     }) => {
    const {
        openColorPickerPanel,
        setOpenPickerPanel,
        activeColor,
        setActiveColor,
        isBold,
        isItalic,
        isUnderlined,
    } = useTextToolbarViewModel(selectedTextFontWeight, selectedTextFontStyle, selectedTextDecorationLine);
    return (
        <div className="toolbar h-[48px] inline-flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md border">
            {/* Font */}
            <FontSelector currentFontFamily={selectedTextFontFamily}
                          handleFontFamilyChange={handleFontFamilyChange}></FontSelector>

            {/* Font Size */}
            <FontSizeField currentFontSize={selectedTextFontSize}
                           handleFontSizeChange={handleFontSizeChange}
            ></FontSizeField>

            {/* Text Formatting */}
            <TextFormatSection
                isBold={isBold}
                isItalic={isItalic}
                isUnderlined={isUnderlined}
                openColorPickerPanel={openColorPickerPanel}
                setOpenPickerPanel={setOpenPickerPanel}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
                handleColorPanelCloseRequest={setOpenPickerPanel}
                handleColorChange={handleColorChange}
                handleFontWeightChange={handleFontWeightChange}
                handleFontStyleChange={handleFontStyleChange}
                handleTextDecorationLineChange={handleTextDecorationLineChange}
            />

            <RxDividerVertical/>

            {/* Paragraph Formatting */}
            <ParagraphFormatSection></ParagraphFormatSection>

            <RxDividerVertical/>

            {/* Position Edit Section */}
            <PositionEditSection
                handleSendBackward={handleSendBackward}
                handleSendToBack={handleSendToBack}
                handleSendForward={handleSendForward}
                handleSendToFront={handleSendToFront}
            />
        </div>);
};

export default TextToolbar;