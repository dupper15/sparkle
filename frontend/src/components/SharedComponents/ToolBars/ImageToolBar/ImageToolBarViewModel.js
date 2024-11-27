// frontend/src/components/SharedComponents/ToolBars/ImageToolBar/ImageToolbarViewModel.js
import { useState } from "react";

const useImageToolbarViewModel = () => {
    const [selectedComponentId, setSelectedComponentId] = useState(null);

    const handleImageClick = (id) => {
        setSelectedComponentId(id);
    };

    return {
        selectedComponentId,
        handleImageClick,
    };
};

export default useImageToolbarViewModel;