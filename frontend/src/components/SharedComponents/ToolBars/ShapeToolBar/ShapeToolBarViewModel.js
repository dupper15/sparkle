import { useState } from "react";

const useShapeToolbarViewModel = () => {
  const [openColorPickerPanel, setOpenPickerPanel] = useState(false);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeTab, setActiveTab] = useState("");
  return {
    openColorPickerPanel,
    setOpenPickerPanel,
    activeColor,
    setActiveColor,
    activeTab,
    setActiveTab,
  };
};

export default useShapeToolbarViewModel;
