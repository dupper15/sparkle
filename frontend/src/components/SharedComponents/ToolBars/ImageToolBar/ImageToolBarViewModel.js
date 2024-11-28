import { useState } from "react";
import {updateShapeColor} from "../../../../services/ImageService.js";

const useImageToolbarViewModel = (selectedComponentId) => {
    const [componentId, setComponentId] = useState(selectedComponentId);
    const [openColorPickerPanel, setOpenPickerPanel] = useState(false);
    const [activeColor, setActiveColor] = useState("#aabbcc");

    const handleImageClick = (id) => {
        setComponentId(id);
    };
    const handleColorClick = () => {
        setOpenPickerPanel((prev) => !prev);
    };
    const handleColorChange = async (color) => {
        if (componentId) {
            try {
                await updateShapeColor(componentId, color);
                setActiveColor(color);
            } catch (error) {
                console.error('Failed to update color:', error);
            }
        }
    };

    return {
        componentId,
        handleImageClick,
        openColorPickerPanel,
        handleColorClick,
        setOpenPickerPanel,
        activeColor,
        setActiveColor,
        handleColorChange,
    };
};

export default useImageToolbarViewModel;