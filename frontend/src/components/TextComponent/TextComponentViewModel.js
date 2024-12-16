// frontend/src/components/TextComponent/TextComponentViewModel.js
import {useState, useRef, useEffect} from "react";
import _ from "lodash";
import TextService from "../../services/TextService.js";

const useTextComponentViewModel = (info, removeComponent, selectedComponents) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({x: 0, y: 0});
    const [position, setPosition] = useState({x: info.x, y: info.y});
    const [size, setSize] = useState({width: info.width, height: info.height});
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [resizeStartPosition, setResizeStartPosition] = useState({x: 0, y: 0});
    const [isTransforming, setIsTransforming] = useState(false);
    const startTransformRef = useRef({x: 0, y: 0, rotate: 0});
    const [deg, setDeg] = useState(0);
    const componentRef = useRef(null);

    const isSelected = selectedComponents.includes(info._id);

    const updateTextInDatabase = useRef(_.debounce((updatedData) => {
        TextService.updateText(info._id, updatedData)
            .then(() => {
            })
            .catch((error) => {
                console.error("Failed to update text", error);
            });
    }, 500)).current;

    const calculateTransform = (e) => {
        const dx = e.clientX - startTransformRef.current.x;
        const dy = e.clientY - startTransformRef.current.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        return angle < 0 ? angle + 360 : angle;
    };

    const handleTransformMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isResizing) {
            setIsTransforming(true);
            startTransformRef.current = {
                x: e.clientX, y: e.clientY, rotate: deg,
            };
        }
    };

    const handleTransformMouseUp = () => {
        setIsTransforming(false);
        updateTextInDatabase({rotate: deg});
    };

    const handleTransformMouseMove = (e) => {
        if (isTransforming) {
            const newDeg = calculateTransform(e);
            setDeg(newDeg);
        }
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        if (!isResizing) {
            setDragOffset({
                x: e.clientX - position.x, y: e.clientY - position.y,
            });
            setIsDragging(true);
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            setPosition({x: newX, y: newY});
            updateTextInDatabase({x: newX, y: newY});
        } else if (isResizing) {
            handleResizeMouseMove(e);
        } else if (isTransforming) {
            handleTransformMouseMove(e);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setIsTransforming(false);
        setResizeDirection(null);
    };

    const handleResizeMouseDown = (e, direction) => {
        e.preventDefault();
        e.stopPropagation();
        setIsResizing(true);
        setResizeDirection(direction);
        setResizeStartPosition({x: e.clientX, y: e.clientY});
    };

    const handleResizeMouseMove = (e) => {
        if (isResizing && resizeDirection) {
            const deltaX = e.clientX - resizeStartPosition.x;
            const deltaY = e.clientY - resizeStartPosition.y;
            let newWidth = size.width;
            let newHeight = size.height;
            let newX = position.x;
            let newY = position.y;
            switch (resizeDirection) {
                case "top-left":
                    newWidth = size.width - deltaX;
                    newHeight = size.height - deltaY;
                    newX = position.x + deltaX;
                    newY = position.y + deltaY;
                    break;
                case "top-right":
                    newWidth = size.width + deltaX;
                    newHeight = size.height - deltaY;
                    newY = position.y + deltaY;
                    break;
                case "bottom-left":
                    newWidth = size.width - deltaX;
                    newHeight = size.height + deltaY;
                    newX = position.x + deltaX;
                    break;
                case "bottom-right":
                    newWidth = size.width + deltaX;
                    newHeight = size.height + deltaY;
                    break;
                case "top":
                    newHeight = size.height - deltaY;
                    newY = position.y + deltaY;
                    break;
                case "bottom":
                    newHeight = size.height + deltaY;
                    break;
                case "left":
                    newWidth = size.width - deltaX;
                    newX = position.x + deltaX;
                    break;
                case "right":
                    newWidth = size.width + deltaX;
                    break;
                default:
                    break;
            }
            newWidth = Math.max(10, newWidth);
            newHeight = Math.max(10, newHeight);
            setSize({width: newWidth, height: newHeight});
            setPosition({x: newX, y: newY});
            updateTextInDatabase({x: newX, y: newY, width: newWidth, height: newHeight});
        }
    };

    useEffect(() => {
        if (isDragging || isResizing || isTransforming) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, isResizing, isTransforming]);

    useEffect(() => {
        if (isTransforming) {
            document.addEventListener("mousemove", handleTransformMouseMove);
            document.addEventListener("mouseup", handleTransformMouseUp);
        } else {
            document.removeEventListener("mousemove", handleTransformMouseMove);
            document.removeEventListener("mouseup", handleTransformMouseUp);
        }
        return () => {
            document.removeEventListener("mousemove", handleTransformMouseMove);
            document.removeEventListener("mouseup", handleTransformMouseUp);
        };
    }, [isTransforming]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Delete" && isSelected) {
                removeComponent(info._id, "Text");
            }
        };
        if (isSelected) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isSelected, info._id, removeComponent]);

    const getShapeStyle = (info) => {
        return {
            position: "absolute",
            top: `${position.y}px`,
            left: `${position.x}px`,
            width: `${size.width}px`,
            height: `${size.height}px`,
            transform: `rotate(${deg}deg)`,
            backgroundColor: "transparent",
        };
    };

    return {
        localPosition: position,
        localSize: size,
        handleMouseDown,
        handleTransformMouseDown,
        handleResizeMouseDown,
        getShapeStyle,
        componentRef,
        isSelected,
        deg,
    };
};

export default useTextComponentViewModel;