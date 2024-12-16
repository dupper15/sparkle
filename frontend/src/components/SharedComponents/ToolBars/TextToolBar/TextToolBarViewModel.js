import { useState, useEffect } from "react";

const useTextToolbarViewModel = (selectedTextFontWeight, selectedTextFontStyle, selectedTextDecorationLine) => {
    const [openColorPickerPanel, setOpenPickerPanel] = useState(false);
    const [activeColor, setActiveColor] = useState("#000000");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderlined, setIsUnderlined] = useState(false);

    useEffect(() => {
        setIsBold(selectedTextFontWeight === "bold");
        setIsItalic(selectedTextFontStyle === "italic");
        setIsUnderlined(selectedTextDecorationLine === "underline");
    }, [selectedTextFontWeight, selectedTextFontStyle, selectedTextDecorationLine]);

    const handleColorClick = () => {
        setOpenPickerPanel(!openColorPickerPanel);
    };

    return {
        openColorPickerPanel,
        handleColorClick,
        setOpenPickerPanel,
        activeColor,
        setActiveColor,
        isBold,
        isItalic,
        isUnderlined,
    };
};

export default useTextToolbarViewModel;