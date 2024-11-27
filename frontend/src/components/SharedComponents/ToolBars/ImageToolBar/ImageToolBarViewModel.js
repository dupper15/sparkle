import { useState } from "react";

const useImageToolbarViewModel = () => {
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [openColorPickerPanel, setOpenPickerPanel] = useState(false);
    const [activeColor, setActiveColor] = useState("#aabbcc");

    const handleImageClick = (id) => {
        setSelectedComponentId(id);
    };
    const handleColorClick = () => {
        setOpenPickerPanel((prev) => !prev);
    };

    return {
        selectedComponentId,
        handleImageClick,
        openColorPickerPanel,
        handleColorClick,
        setOpenPickerPanel,
        activeColor,
        setActiveColor,
    };
};

export default useImageToolbarViewModel;