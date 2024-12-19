import React, {useState} from 'react';
import {FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaListOl, FaListUl} from 'react-icons/fa';
import {PiPlaceholderThin} from "react-icons/pi";

// eslint-disable-next-line react/prop-types
const ParagraphFormatSection = ({currentTextAlign, handleTextAlignChange, setActiveTab, activeTab}) => {

    const handleAlignmentClick = () => {
        const newFormatType = getNextAlignmentType(currentTextAlign);
        handleTextAlignChange(newFormatType);
    };

    const getNextAlignmentType = (currentAlignment) => {
        switch (currentAlignment) {
            case 'left':
                return 'center';
            case 'center':
                return 'right';
            case 'right':
                return 'justify';
            case 'justify':
                return 'left';
            default:
                return 'none';
        }
    };

    const getAlignmentIcon = (alignmentType) => {
        switch (alignmentType) {
            case 'left':
                return <FaAlignLeft/>;
            case 'center':
                return <FaAlignCenter/>;
            case 'right':
                return <FaAlignRight/>;
            case 'justify':
                return <FaAlignJustify/>;
            default:
                return null;
        }
    };

    return (<div className="h-8 toolbar flex">
        <button
            className={`text-gray-700 text-xl pr-2 mr-1 ${currentTextAlign !== 'none' ? 'active' : ''}`}
            onClick={() => {
                handleAlignmentClick();
                setActiveTab(activeTab === 'none');
            }}
        >
            {getAlignmentIcon(currentTextAlign)}
        </button>
    </div>);
};

export default ParagraphFormatSection;