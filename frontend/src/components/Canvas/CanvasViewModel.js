import {useEffect, useRef, useState} from "react";
import {useDroppable} from "@dnd-kit/core";
import {useDarkMode} from "../../contexts/DarkModeContext";

const useCanvasViewModel = (id, shapes, removeElement, updateShapePosition) => {
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [isImageToolBarOpen, setOpenImageToolBar] = useState(false);
    const [isTextToolBarOpen, setOpenTextToolBar] = useState(false);

    const canvasRef = useRef(null);
    const {isOver, setNodeRef} = useDroppable({id});
    const {isDarkMode} = useDarkMode();

    const handleImageClick = (id) => {
        setOpenImageToolBar(true);
        setOpenTextToolBar(false);
        setSelectedComponentId(id);
    };

    const handleTextClick = (id) => {
        setOpenTextToolBar(true);
        setOpenImageToolBar(false);
        setSelectedComponentId(id);
    };

    const handleClickOutside = (event) => {
        if (canvasRef.current && !canvasRef.current.contains(event.target)) {
            setOpenImageToolBar(false);
            setOpenTextToolBar(false);
            setSelectedComponentId(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return {
        selectedComponentId,
        isImageToolBarOpen,
        isTextToolBarOpen,
        canvasRef,
        isOver,
        setNodeRef,
        isDarkMode,
        handleImageClick,
        handleTextClick,
    };
};

export default useCanvasViewModel;