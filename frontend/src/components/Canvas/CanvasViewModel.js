import {useEffect, useRef, useState} from "react";
import {useDroppable} from "@dnd-kit/core";
import {useDarkMode} from "../../contexts/DarkModeContext";
import axios from "axios";

const useCanvasViewModel = (id, databaseId, updateShapePosition) => {
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

    const fetchComponents = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_KEY}/canvas/get-components/${databaseId}`);
            setShapes(response.data.data || []); // Ensure shapes is an array
            // console.log("Components:", response.data.data);
        } catch (error) {
            console.error("Failed to fetch components:", error);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        fetchComponents()
            .then(() => {
                console.log("Components fetched successfully");
                console.log("Shapes:", shapes);
            })
            .catch((error) => {
                console.error("Error fetching components:", error);
            });
    }, [databaseId]);

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