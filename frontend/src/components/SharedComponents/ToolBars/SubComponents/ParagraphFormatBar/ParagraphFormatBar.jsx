import React, { useState } from 'react';
import { FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaListOl, FaListUl } from 'react-icons/fa';
import {PiPlaceholderThin} from "react-icons/pi";

const ParagraphFormatBar = () => {
    const [alignmentType, setAlignmentType] = useState('left'); // Initial state

    const handleAlignmentClick = () => {
        const newFormatType = getNextAlignmentType(alignmentType);
        setAlignmentType(newFormatType);
    };

    const [listType, setListType] = useState('list-none'); // Initial state

    const handleListClick = () => {
        const newListType = getNextListType(listType);
        setListType(newListType);
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
                return <FaAlignLeft />;
            case 'center':
                return <FaAlignCenter />;
            case 'right':
                return <FaAlignRight />;
            case 'justify':
                return <FaAlignJustify />;
            default:
                return null;
        }
    };

    const getNextListType = (currentListType) => {
        switch (currentListType) {
            case 'list-none':
                return 'list-ordered';
            case 'list-ordered':
                return 'list-unordered';
            case 'list-unordered':
                return 'list-none'; // Back to initial state
            default:
                return 'none';
        }
    };

    const getListIcon = (listType) => {
        switch (listType) {
            case 'list-none':
                return <PiPlaceholderThin />
            case 'list-ordered':
                return <FaListOl />;
            case 'list-unordered':
                return <FaListUl />;
            default:
                return null;
        }
    };
    return (
        <div className="paragraph-format-bar">
            <button
                className={`text-gray-700 text-xl pr-2 ${alignmentType !== 'none' ? 'active' : ''}`}
                onClick={handleAlignmentClick}
            >
                {getAlignmentIcon(alignmentType)}
            </button>
            <button
                className={`text-gray-700 text-xl pr-2 ${listType !== 'none' ? 'active' : ''}`}
                onClick={handleListClick}
            >
                {getListIcon(listType)}
            </button>
        </div>
    );
};

export default ParagraphFormatBar;