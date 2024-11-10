import {useState} from 'react';
import {FaBold, FaCircle, FaItalic, FaStrikethrough, FaUnderline} from "react-icons/fa";
import {MdFormatColorText} from "react-icons/md";
import ColorPickerPanel from "../../../ColorPickerPanel/ColorPickerPanel.jsx";

const TextFormatSection = () => {
    //const [text, setText] = useState('');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isUppercase, setIsUppercase] = useState(false);
    const [openColorPickerPanel, setOpenPickerPanel] = useState(false);

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
    const handleColorClick = () => {
        setOpenPickerPanel(prev => !prev);
    }
    const handleColorPanelCloseRequest = () => {

    }

    // Similar functions for other formatting options

    return (
        <div>
            <div className="h-8 toolbar flex">
                {/* Color Selector */}
                <button className="text-xl text-amber-950 pl-1 pr-1 mr-1" onClick={handleColorClick}>
                    <FaCircle/>
                </button>

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
            <div className={'fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'}>
                {
                    openColorPickerPanel &&
                    <ColorPickerPanel
                        colorPanelCloseRequest={setOpenPickerPanel}
                    ></ColorPickerPanel>
                }
            </div>
        </div>
    );
};

export default TextFormatSection;