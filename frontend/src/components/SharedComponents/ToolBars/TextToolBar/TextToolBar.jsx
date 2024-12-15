import React from "react";
import { RxDividerVertical } from "react-icons/rx";
import FontSelector from "../SubComponents/FontSelector/FontSelector.jsx";
import FontSizeField from "../SubComponents/FontSizeField/FontSizeField.jsx";
import ParagraphFormatSection from "../SubComponents/ParagraphFormatSection/ParagraphFormatSection.jsx";
import TextFormatSection from "../SubComponents/TextFormatSection/TextFormatSection.jsx";
import PositionEditSection from "../SubComponents/PositionEditSection/PositionEditSection.jsx";
import useTextToolbarViewModel from "./TextToolbarViewModel";

/* eslint react/prop-types: 0 */
const TextToolbar = ({
                         selectedComponentId,
                         handleColorChange,
                         handleSendBackward,
                         handleSendToBack,
                         handleSendForward,
                         handleSendToFront
                     }) => {
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
                setOpenPickerPanel={setOpenPickerPanel}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
                handleBoldClick={handleBoldClick}
                handleItalicClick={handleItalicClick}
                handleColorClick={handleColorClick}
                handleColorPanelCloseRequest={setOpenPickerPanel}
                handleColorChange={handleColorChange}
            ></TextFormatSection>

            <RxDividerVertical />

            {/* Paragraph Formatting */}
            <ParagraphFormatSection></ParagraphFormatSection>

            <RxDividerVertical />

            {/* Position Edit Section */}
            <PositionEditSection
                handleSendBackward={handleSendBackward}
                handleSendToBack={handleSendToBack}
                handleSendForward={handleSendForward}
                handleSendToFront={handleSendToFront}
            />
        </div>
    );
};

export default TextToolbar;