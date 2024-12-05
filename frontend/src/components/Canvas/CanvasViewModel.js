import {useEffect, useRef, useState} from "react";
import {useDroppable} from "@dnd-kit/core";
import {useDarkMode} from "../../contexts/DarkModeContext";
import axios from "axios";
import {removeAndPopComponentFromCanvas} from "../../services/utils/componentOrchestrator.js";
import ComponentService from "../../services/ComponentService.js";

const useCanvasViewModel = (id, databaseId) => {
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [isImageToolBarOpen, setOpenImageToolBar] = useState(false);
    const [isTextToolBarOpen, setOpenTextToolBar] = useState(false);
    const [shapes, setShapes] = useState([]); // Initialize with an empty array
    const [selectedComponents, setSelectedComponents] = useState([]);

    const canvasRef = useRef(null);
    const {isOver, setNodeRef} = useDroppable({id});
    const {isDarkMode} = useDarkMode();

    const handleColorChange = (color) => {
        setShapes((prevShapes) =>
            prevShapes.map((shape) =>
                selectedComponents.includes(shape._id) ? { ...shape, color } : shape
            )
        );
        selectedComponents.forEach(componentId => {
            ComponentService.updateComponentColor("shape", color, componentId).then();
        });
    }

    const handleSelectComponent = (componentId) => {
        setSelectedComponents((prev) => {
            if (!prev.includes(componentId)) {
                return [...prev, componentId];
            }
            return prev;
        });
    }

    const handleImageClick = (shapeId) => {
        setOpenImageToolBar(true);
        setOpenTextToolBar(false);
        handleSelectComponent(shapeId);
    };

    const handleTextClick = (databaseId) => {
        setOpenTextToolBar(true);
        setOpenImageToolBar(false);
        setSelectedComponentId(databaseId);
    };

    const handleSendBackward = () => {
        console.log("Send Backward");
    }

    const handleSendToBack = () => {
        console.log("Send To Back");
    }

    const handleSendForward = () => {
        console.log("Send Forward");
    }

    const handleSendToFront = () => {
        console.log("Send To Front");
    }

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

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (canvasRef.current && canvasRef.current.contains(event.target)) {
    //             const isComponent = selectedComponents.some(componentId => {
    //                 const componentElement = document.getElementById(`component-${componentId}`);
    //                 return componentElement && componentElement.contains(event.target);
    //             });
    //
    //             if (!isComponent) {
    //                 setOpenImageToolBar(false);
    //                 setOpenTextToolBar(false);
    //                 setSelectedComponents([]);
    //                 console.log(selectedComponents);
    //             }
    //         }
    //     };
    //
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [selectedComponents]);

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
        handleColorChange,
        handleSendBackward,
        handleSendToBack,
        handleSendForward,
        handleSendToFront
    };
};

export default useCanvasViewModel;