import {FaBold, FaCircle, FaItalic, FaUnderline} from "react-icons/fa";
import ColorPickerPanel from "../../../ColorPickerPanel/ColorPickerPanel.jsx";
import React, {useState, useEffect} from "react";

const TextFormatSection = ({
                               isBold,
                               isItalic,
                               isUnderlined,
                               activeColor,
                               setActiveColor,
                               handleColorChange,
                               handleFontWeightChange,
                               handleFontStyleChange,
                               handleTextDecorationLineChange,
                               activeTab,
                               setActiveTab,
                           }) => {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({x: 0, y: 0});

    const handleCloseColorPickerPanel = () => {
        setActiveTab("");
    };

    const handleMouseDown = (e) => {
        if (e.target.closest('.color-picker-handle')) {
            setIsDragging(true);
            setDragStart({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div>
            <div className="h-8 toolbar flex">
                {/* Color Selector */}
                <div className="h-8 toolbar flex">
                    <button
                        style={{color: activeColor}}
                        className={`text-xl rounded text-gray-700 pl-1 pr-1 mr-1 ${
                            activeTab === "color" ? "bg-purple-200 text-purple-700" : ""
                        }`}
                        onClick={() => {
                            setActiveTab(activeTab === "color" ? "" : "color");
                        }}
                    >
                        <FaCircle/>
                    </button>
                </div>
                <div
                    className="fixed"
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)`,
                        cursor: isDragging ? 'grabbing' : 'default'
                    }}
                >
                    {activeTab === "color" && (
                        <div className="relative">
                            <div
                                className="z-50 color-picker-handle h-6 bg-gray-200 cursor-grab active:cursor-grabbing mb-1 rounded"
                                onMouseDown={handleMouseDown}
                            >
                                <div className="text-center text-sm text-gray-600">Drag here</div>
                            </div>
                            <ColorPickerPanel
                                colorPanelCloseRequest={handleCloseColorPickerPanel}
                                activeColor={activeColor}
                                setActiveColor={setActiveColor}
                                handleColorChange={handleColorChange}
                            />
                        </div>
                    )}
                </div>

                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${
                        isBold ? "bg-purple-200 text-purple-700" : ""
                    }`}
                    onClick={() => {
                        setActiveTab("");
                        handleFontWeightChange(isBold ? "normal" : "bold");
                    }}
                >
                    <FaBold/>
                </button>
                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${
                        isItalic ? "bg-purple-200 text-purple-700" : ""
                    }`}
                    onClick={() => {
                        setActiveTab("");
                        handleFontStyleChange(isItalic ? "normal" : "italic");
                    }}
                >
                    <FaItalic/>
                </button>
                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${
                        isUnderlined ? "bg-purple-200 text-purple-700" : ""
                    }`}
                    onClick={() => {
                        setActiveTab("");
                        handleTextDecorationLineChange(isUnderlined ? "none" : "underline");
                    }}
                >
                    <FaUnderline/>
                </button>
            </div>
        </div>
    );
};

export default TextFormatSection;