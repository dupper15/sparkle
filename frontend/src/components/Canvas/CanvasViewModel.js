// frontend/src/components/Canvas/CanvasViewModel.js
import { useEffect, useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { useDarkMode } from "../../contexts/DarkModeContext";
import axios from "axios";
import { removeAndPopComponentFromCanvas } from "../../services/utils/componentOrchestrator.js";
import ComponentService from "../../services/ComponentService.js";

const useCanvasViewModel = (id, databaseId) => {
    const [isImageToolBarOpen, setOpenImageToolBar] = useState(false);
    const [isTextToolBarOpen, setOpenTextToolBar] = useState(false);
    const [components, setComponents] = useState([]);
    const [selectedComponents, setSelectedComponents] = useState([]);
    const canvasRef = useRef(null);
    const { isOver, setNodeRef } = useDroppable({ id });
    const { isDarkMode } = useDarkMode();

    // Fetch components from the database
    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_KEY}/canvas/get-components/${databaseId}`);
                setComponents(response.data.data || []);
            } catch (error) {
                console.error("Failed to fetch components:", error);
            }
        };

        fetchComponents();

        const eventTypes = ["shapes", "texts"];
        eventTypes.forEach(type => {
            document.addEventListener(`update-${type}-${id}`, fetchComponents);
        });

        return () => {
            eventTypes.forEach(type => {
                document.removeEventListener(`update-${type}-${id}`, fetchComponents);
            });
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
    const updateComponent = (updateFn) => {
        setComponents((prevComponents) =>
            prevComponents.map((component) =>
                selectedComponents.includes(component._id) ? updateFn(component) : component
            )
        );
    };

    // Handle color change
    const handleColorChange = (color) => {
        updateComponent((component) => {
            ComponentService.updateComponentColor(component.type, color, component._id).then();
            return { ...component, color };
        });
    };

    // Handle component selection
    const handleSelectComponent = (componentId, event) => {
        const componentType = components.find(component => component._id === componentId)?.type;
        setSelectedComponents((prev) => {
            if (event.shiftKey) {
                const allSameType = prev.every(id => components.find(component => component._id === id)?.type === componentType);
                if (allSameType) {
                    return prev.includes(componentId) ? prev.filter(id => id !== componentId) : [...prev, componentId];
                } else {
                    return prev;
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
    const handleTextClick = (textId, event) => {
        handleSelectComponent(textId, event);
        setOpenTextToolBar(true);
        setOpenImageToolBar(false);
    };

    // Remove component
    const removeComponent = async (componentId, componentType) => {
        try {
            await removeAndPopComponentFromCanvas(databaseId, componentType, componentId);
            setComponents((prevComponents) => prevComponents.filter((component) => component._id !== componentId));
        } catch (error) {
            console.error("Failed to remove component:", error);
        }
    };

    // ZIndex helper functions
    const getNewZIndex = (component, change) => component.zIndex + change;

    const calculateNewZIndex = (component, change) => {
        if (change === 50 || change === 0) return change;
        if ((component.zIndex === 50 && change > 0) || (component.zIndex === 0 && change < 0)) return component.zIndex;
        return getNewZIndex(component, change);
    };

    const updateComponentZIndex = (component, change) => {
        const newZIndex = calculateNewZIndex(component, change);
        ComponentService.updateComponentZIndex(component.type, newZIndex, component._id).then();
        return { ...component, zIndex: newZIndex };
    };

    // Handle ZIndex change
    const handleChangeZIndex = (change) => {
        updateComponent((component) => updateComponentZIndex(component, change));
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
        components,
        removeComponent,
        handleColorChange,
        handleSendBackward: () => handleChangeZIndex(-1),
        handleSendToBack: () => handleChangeZIndex(0),
        handleSendForward: () => handleChangeZIndex(1),
        handleSendToFront: () => handleChangeZIndex(50)
    };
};

export default useCanvasViewModel;