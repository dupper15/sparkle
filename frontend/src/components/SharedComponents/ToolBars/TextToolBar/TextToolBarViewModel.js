import { useState, useCallback } from "react";
import {updateTextColor, updateTextTransformation, uploadText} from "../../../../services/TextService.js";

const useTextToolbarViewModel = (selectedComponentId) => {
    const [openColorPickerPanel, setOpenPickerPanel] = useState(false);
    const [activeColor, setActiveColor] = useState("#000000");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);

    const handleColorClick = () => {
        setOpenPickerPanel(!openColorPickerPanel);
    };

    const handleColorChange = useCallback((color) => {
        setActiveColor(color);
        updateTextColor(selectedComponentId, color).then(r => console.log(r));
    }, [selectedComponentId]);

    const handleBoldClick = () => {
        setIsBold(!isBold);
        updateTextTransformation(selectedComponentId, "bold", !isBold).then(r => console.log(r));
    };

    const handleItalicClick = () => {
        setIsItalic(!isItalic);
        updateTextTransformation(selectedComponentId, "italic", !isItalic).then(r => console.log(r));
    };

    const uploadProperties = async () => {
        const properties = {
            color: activeColor,
            bold: isBold,
            italic: isItalic,
        };
        await uploadText(selectedComponentId, properties);
    };

    return {
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
    };
};

export default useTextToolbarViewModel;