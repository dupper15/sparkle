import {useState} from 'react';
import {FaBold, FaBorderStyle, FaCircle, FaCrop, FaItalic, FaStrikethrough, FaUnderline} from "react-icons/fa";
import {MdFormatColorText} from "react-icons/md";
import ColorPickerPanel from "../../../ColorPickerPanel/ColorPickerPanel.jsx";

const ImageStylesEditSection = () => {
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

                {/*Crop*/}
                <button
                    className='text-gray-700 text-xl'
                    onClick={handleUppercaseClick}
                >
                    <FaBorderStyle />
                </button>
            </div>
            <div className={'fixed top-1/2 left-1/2 translate-x-[120%] '}>
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

export default ImageStylesEditSection;