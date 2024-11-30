import { useEffect, useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { useDarkMode } from "../../contexts/DarkModeContext";
import axios from "axios";

const useCanvasViewModel = (id, updateShapePosition) => {
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [isImageToolBarOpen, setOpenImageToolBar] = useState(false);
    const [isTextToolBarOpen, setOpenTextToolBar] = useState(false);
    const [shapes, setShapes] = useState([]);

    const canvasRef = useRef(null);
    const { isOver, setNodeRef } = useDroppable({ id });
    const { isDarkMode } = useDarkMode();

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

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const response = await axios.get(`http://<your-server-url>/getComponents?canvasId=${id}`);
                setShapes(response.data.components);
            } catch (error) {
                console.error("Failed to fetch components:", error);
            }
        };

        fetchComponents();
    }, [id]);

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
        shapes,
    };
};

export default useCanvasViewModel;