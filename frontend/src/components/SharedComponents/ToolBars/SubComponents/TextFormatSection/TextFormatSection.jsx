import { FaBold, FaCircle, FaItalic, FaUnderline } from "react-icons/fa";
import ColorPickerPanel from "../../../ColorPickerPanel/ColorPickerPanel.jsx";

const TextFormatSection = ({
                               isBold,
                               isItalic,
                               isUnderline,
                               openColorPickerPanel,
                               handleBoldClick,
                               handleItalicClick,
                               handleUnderlineClick,
                               handleColorClick,
                               handleColorPanelCloseRequest,
                           }) => {
    return (
        <div>
            <div className="h-8 toolbar flex">
                {/* Color Selector */}
                <button className="text-xl text-amber-950 pl-1 pr-1 mr-1" onClick={handleColorClick}>
                    <FaCircle />
                </button>

                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isBold ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={handleBoldClick}
                >
                    <FaBold />
                </button>
                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isItalic ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={handleItalicClick}
                >
                    <FaItalic />
                </button>
                <button
                    className={`rounded text-gray-700 pl-1 pr-1 mr-1 ${isUnderline ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={handleUnderlineClick}
                >
                    <FaUnderline />
                </button>
            </div>
            <div className={'fixed top-1/2 left-1/2 translate-x-[120%] '}>
                {
                    openColorPickerPanel &&
                    <ColorPickerPanel
                        colorPanelCloseRequest={handleColorPanelCloseRequest}
                    ></ColorPickerPanel>
                }
            </div>
        </div>
    );
};

export default TextFormatSection;