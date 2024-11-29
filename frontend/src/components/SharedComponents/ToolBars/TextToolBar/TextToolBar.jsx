import React from "react";
import { RxDividerVertical } from "react-icons/rx";
import FontSelector from "../SubComponents/FontSelector/FontSelector.jsx";
import FontSizeField from "../SubComponents/FontSizeField/FontSizeField.jsx";
import ParagraphFormatSection from "../SubComponents/ParagraphFormatSection/ParagraphFormatSection.jsx";
import TextFormatSection from "../SubComponents/TextFormatSection/TextFormatSection.jsx";
import PositionEditSection from "../SubComponents/PositionEditSection/PositionEditSection.jsx";
import useTextToolbarViewModel from "./TextToolbarViewModel";

/* eslint react/prop-types: 0*/
const TextToolbar = ({ selectedComponentId }) => {
    const {
        openColorPickerPanel,
        handleColorClick,
        setOpenPickerPanel,
        activeColor,
        setActiveColor,
        isBold,
        isItalic,
        handleBoldClick,
        handleItalicClick,
        handleColorChange,
        uploadProperties,
    } = useTextToolbarViewModel(selectedComponentId);

    return (
        <div className="h-[48px] inline-flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md border">
            {/* Font */}
            <FontSelector fontName="Ariel"></FontSelector>

            {/* Font Size */}
            <FontSizeField></FontSizeField>

            {/* Text Formatting */}
            <TextFormatSection
                isBold={isBold}
                isItalic={isItalic}
                openColorPickerPanel={openColorPickerPanel}
                handleBoldClick={handleBoldClick}
                handleItalicClick={handleItalicClick}
                handleColorClick={handleColorClick}
                handleColorPanelCloseRequest={setOpenPickerPanel}
            ></TextFormatSection>

            <RxDividerVertical />

            {/* Paragraph Formatting */}
            <ParagraphFormatSection></ParagraphFormatSection>

            <RxDividerVertical />

            <PositionEditSection></PositionEditSection>
        </div>
    );
};

export default TextToolbar;