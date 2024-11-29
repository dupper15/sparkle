import { useState, useCallback } from "react";
import { updateShapeColor, updateShapeTransformation } from "../../../../services/ShapeService.js";

const useImageToolbarViewModel = (selectedComponentId) => {
    const [openColorPickerPanel, setOpenPickerPanel] = useState(false);
    const [activeColor, setActiveColor] = useState("#000000");
    const [isFlipMenuOpen, setIsFlipMenuOpen] = useState(false);
    const [isCropModeOpen, setOpenCropMode] = useState(false);

    const handleColorClick = () => {
        setOpenPickerPanel(!openColorPickerPanel);
    };

    const handleColorChange = useCallback((color) => {
        setActiveColor(color);
        updateShapeColor(selectedComponentId, color).then(r => console.log(r));
    }, [selectedComponentId]);

    const handleFlipClick = () => {
        setIsFlipMenuOpen(!isFlipMenuOpen);
    };

    const handleCropClick = () => {
        setOpenCropMode(!isCropModeOpen);
    };

    const handleHorizontalFlipClick = () => {
        updateShapeTransformation(selectedComponentId, "flip", "horizontal").then(r => console.log(r));
    };

    const handleVerticalFlipClick = () => {
        updateShapeTransformation(selectedComponentId, "flip", "vertical").then(r => console.log(r));
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
        handleColorChange,
        handleHorizontalFlipClick,
        handleVerticalFlipClick,
    };
};

export default useImageToolbarViewModel;