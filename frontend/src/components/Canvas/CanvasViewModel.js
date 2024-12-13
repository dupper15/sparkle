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

    // Fetch components from the database
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

    // Handle clicks outside the canvas
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.shiftKey) return;
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

    // Update component helper function
    const updateComponent = (componentId, updateFn) => {
        setShapes((prevShapes) =>
            prevShapes.map((shape) =>
                selectedComponents.includes(shape._id) ? updateFn(shape) : shape
            )
        );
    };

    // Handle color change
    const handleColorChange = (color) => {
        updateComponent(null, (shape) => {
            ComponentService.updateComponentColor("shape", color, shape._id).then();
            return { ...shape, color };
        });
    };

    // Handle component selection
    const handleSelectComponent = (componentId, event) => {
        setSelectedComponents((prev) => {
            if (event.shiftKey) {
                return prev.includes(componentId) ? prev.filter(id => id !== componentId) : [...prev, componentId];
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
    const handleTextClick = () => {
        setOpenTextToolBar(true);
        setOpenImageToolBar(false);
    };

    // Remove component
    const removeComponent = async (componentId, componentType) => {
        try {
            await removeAndPopComponentFromCanvas(databaseId, componentType, componentId);
            setShapes((prevShapes) => prevShapes.filter((shape) => shape._id !== componentId));
        } catch (error) {
            console.error("Failed to remove component:", error);
        }
    };

    // ZIndex helper functions
    const getNewZIndex = (shape, change) => shape.zIndex + change;

    const calculateNewZIndex = (shape, change) => {
        if (change === 50 || change === 0) return change;
        if ((shape.zIndex === 50 && change > 0) || (shape.zIndex === 0 && change < 0)) return shape.zIndex;
        return getNewZIndex(shape, change);
    };

    const updateShapeZIndex = (shape, change) => {
        const newZIndex = calculateNewZIndex(shape, change);
        ComponentService.updateComponentZIndex("shape", newZIndex, shape._id).then();
        return { ...shape, zIndex: newZIndex };
    };

    // Handle ZIndex change
    const handleChangeZIndex = (change) => {
        updateComponent(null, (shape) => updateShapeZIndex(shape, change));
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
        handleSendBackward: () => handleChangeZIndex(-1),
        handleSendToBack: () => handleChangeZIndex(0),
        handleSendForward: () => handleChangeZIndex(1),
        handleSendToFront: () => handleChangeZIndex(50)
    };
};

export default useCanvasViewModel;