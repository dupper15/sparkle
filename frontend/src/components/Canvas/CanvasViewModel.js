import { useEffect, useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { useDarkMode } from "../../contexts/DarkModeContext";
import axios from "axios";
import { removeAndPopComponentFromCanvas } from "../../services/utils/componentOrchestrator.js";
import ComponentService from "../../services/ComponentService.js";

const useCanvasViewModel = (id, databaseId) => {
    const [isImageToolBarOpen, setOpenImageToolBar] = useState(false);
    const [isTextToolBarOpen, setOpenTextToolBar] = useState(false);
    const [shapes, setShapes] = useState([]);
    const [selectedComponents, setSelectedComponents] = useState([]);
    const canvasRef = useRef(null);
    const { isOver, setNodeRef } = useDroppable({ id });
    const { isDarkMode } = useDarkMode();

    // Fetch components from the server
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

    // Handle click outside the component
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.shiftKey) {
                return; // Ignore clicks when the shift key is pressed
            }

            if (canvasRef.current) {
                const isInsideComponent = selectedComponents.some((componentId) => {
                    const componentElement = document.getElementById(`${componentId}`);
                    return componentElement && componentElement.contains(event.target);
                });

                const toolbars = document.querySelectorAll(".toolbar, .color-picker-panel");
                const isClickInsideToolbar = Array.from(toolbars).some(toolbar => toolbar.contains(event.target));

                if (!isInsideComponent && !isClickInsideToolbar) {
                    setOpenImageToolBar(false);
                    setOpenTextToolBar(false);
                    setSelectedComponents([]);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedComponents, canvasRef]);

    useEffect(() => {
        console.log("Selected components:", selectedComponents);
    }, [selectedComponents]);

    // Handle color change
    const handleColorChange = (color) => {
        setShapes((prevShapes) =>
            prevShapes.map((shape) =>
                selectedComponents.includes(shape._id) ? { ...shape, color } : shape
            )
        );
        selectedComponents.forEach(componentId => {
            ComponentService.updateComponentColor("shape", color, componentId).then();
        });
    };

    // Handle component selection
    const handleSelectComponent = (componentId, event) => {
        setSelectedComponents((prev) => {
            if (event.shiftKey) {
                if (!prev.includes(componentId)) {
                    return [...prev, componentId];
                } else {
                    return prev.filter(id => id !== componentId);
                }
            } else {
                return [componentId];
            }
        });
    };

    // Handle shape click
    const handleShapeClick = (shapeId, event) => {
        handleSelectComponent(shapeId, event);
        setOpenImageToolBar(true);
        setOpenTextToolBar(false);
    };

    // Handle text click
    const handleTextClick = (databaseId) => {
        setOpenTextToolBar(true);
        setOpenImageToolBar(false);
    };

    // Remove component
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

    // Placeholder functions for future implementation
    const handleSendBackward = () => {
        console.log("Send Backward");
    };

    const handleSendToBack = () => {
        console.log("Send To Back");
    };

    const handleSendForward = () => {
        console.log("Send Forward");
    };

    const handleSendToFront = () => {
        console.log("Send To Front");
    };

    return {
        selectedComponents,
        isImageToolBarOpen,
        isTextToolBarOpen,
        canvasRef,
        isOver,
        setNodeRef,
        isDarkMode,
        handleShapeClick,
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