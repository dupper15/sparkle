import {useEffect, useRef, useState} from "react";
import {useDroppable} from "@dnd-kit/core";
import {useDarkMode} from "../../contexts/DarkModeContext";
import axios from "axios";
import {removeAndPopComponentFromCanvas} from "../../services/utils/componentOrchestrator.js";

const useCanvasViewModel = (id, databaseId) => {
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [isImageToolBarOpen, setOpenImageToolBar] = useState(false);
    const [isTextToolBarOpen, setOpenTextToolBar] = useState(false);
    const [shapes, setShapes] = useState([]); // Initialize with an empty array

    const canvasRef = useRef(null);
    const {isOver, setNodeRef} = useDroppable({id});
    const {isDarkMode} = useDarkMode();

    const handleImageClick = (databaseId) => {
        setOpenImageToolBar(true);
        setOpenTextToolBar(false);
        setSelectedComponentId(databaseId);
    };

    const handleTextClick = (databaseId) => {
        setOpenTextToolBar(true);
        setOpenImageToolBar(false);
        setSelectedComponentId(databaseId);
    };

    const handleClickOutside = (event) => {
        if (canvasRef.current && !canvasRef.current.contains(event.target)) {
            setOpenImageToolBar(false);
            setOpenTextToolBar(false);
            setSelectedComponentId(null);
        }
    };

    const removeComponent = async (componentId, componentType) => {
        try {
            await removeAndPopComponentFromCanvas(databaseId, componentType, componentId);
            setShapes((prevShapes) => {
                return prevShapes.filter((shape) => shape._id !== componentId);
            });
        } catch (error) {
            console.error("Failed to remove component:", error);
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
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/canvas/get-components/${databaseId}`);
                setShapes(response.data.data || []);
            } catch (error) {
                console.error("Failed to fetch components:", error);
            }
        };
        fetchComponents();
        document.addEventListener(`update-shapes-${id}`, fetchComponents);
        return () => {
            document.removeEventListener(`update-shapes-${id}`, fetchComponents);
        };
    }, [databaseId, id]);

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
        removeComponent,
    };
};

export default useCanvasViewModel;