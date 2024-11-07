import { useState } from 'react';
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";

const FormattingToolbar = () => {
    //const [text, setText] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isUppercase, setIsUppercase] = useState(false);

    const handleBoldClick = () => {
        setIsBold(!isBold);
    };
    const handleItalicClick = () => {
        setIsItalic(!isItalic);
    };
    const handleUnderlineClick = () => {
        setIsUnderline(!isUnderline);
    };
    const handleStrikethroughClick = () => {
        setIsStrikethrough(!isStrikethrough);
    };
    const handleUppercaseClick = () => {
        setIsUppercase(!isUppercase);
    };

    // Similar functions for other formatting options

    return (
        <div>
            <div className="h-8 toolbar flex">
                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isBold ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={handleBoldClick}
                >
                    <FaBold/>
                </button>
                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isItalic ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={handleItalicClick}
                >
                    <FaItalic/>
                </button>
                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isUnderline ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={handleUnderlineClick}
                >
                    <FaUnderline/>
                </button>
                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isStrikethrough ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={handleStrikethroughClick}
                >
                    <FaStrikethrough/>
                </button>

                <button
                    className={`rounded text-gray-700 pl-1 pr-1 font-medium ${isUppercase ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={handleUppercaseClick}
                >
                    aA
                </button>
            </div>
        </div>
    );
};

export default FormattingToolbar;