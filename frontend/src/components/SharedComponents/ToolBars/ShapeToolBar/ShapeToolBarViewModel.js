import { useState } from "react";
import { updateShapeTransformation } from "../../../../services/ShapeService.js";

const useShapeToolbarViewModel = () => {
    const [openColorPickerPanel, setOpenPickerPanel] = useState(false);
    const [activeColor, setActiveColor] = useState("#000000");
    const [isFlipMenuOpen, setIsFlipMenuOpen] = useState(false);
    const [isCropModeOpen, setOpenCropMode] = useState(false);

    const handleColorClick = () => {
        setOpenPickerPanel(!openColorPickerPanel);
    };

    const handleFlipClick = () => {
        setIsFlipMenuOpen(!isFlipMenuOpen);
    };

    const handleCropClick = () => {
        setOpenCropMode(!isCropModeOpen);
    };

    return {
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
    };
};

export default useShapeToolbarViewModel;