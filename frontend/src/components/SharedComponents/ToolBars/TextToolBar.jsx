import {
    FaAlignLeft,
    FaBold, FaBrush,
    FaItalic, FaLayerGroup, FaListUl, FaMagic, FaPlayCircle,
    FaStrikethrough,
    FaUnderline
} from "react-icons/fa";
import {RxDividerVertical, RxTransparencyGrid} from "react-icons/rx";
import FontSelector from "./SubComponents/FontSelector/FontSelector.jsx";
import FontSizeField from "./SubComponents/FontSizeField/FontSizeField.jsx";
import TextFormatBar from "./SubComponents/TextFormatBar/TextFormatBar.jsx";
import ParagraphFormatBar from "./SubComponents/ParagraphFormatBar/ParagraphFormatBar.jsx";
/* eslint react/prop-types: 0*/
const TextToolbar = ({
                         onBoldToggle = () => {
                         },
                         onItalicToggle = () => {
                         },
                         onUnderlineToggle = () => {
                         },
                         onStrikethroughToggle = () => {
                         },
                         onAllCapsToggle = () => {
                         },
                         onChangeAlignment = () => {
                         },
                         onList = () => {
                         },
                         onEffects = () => {
                         },
                         onAnimate = () => {
                         },
                         onPosition = () => {
                         },
                         onChangeTransparency = () => {
                         }
                     }) => {
    return (<div className="h-[48px] inline-flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md border">
            {/* Font */}
            <FontSelector fontName='Ariel'></FontSelector>

            {/* Font Size */}
            <FontSizeField></FontSizeField>

            {/* Text Formatting */}
            <TextFormatBar></TextFormatBar>

            {/* Paragraph Formatting */}
            <ParagraphFormatBar></ParagraphFormatBar>

            <RxDividerVertical/>

            {/* Transparency */}
            <button className="text-black text-xl" onClick={onChangeTransparency}>
                <RxTransparencyGrid/>
            </button>

            <RxDividerVertical/>

            {/* Effects */}
            <button className="bg-purple-200 text-purple-700 px-2 rounded text-xl" onClick={onEffects}>
                <FaMagic></FaMagic>
            </button>

            <RxDividerVertical/>

            {/* Animate and Position */}
            <button className="text-gray-700 text-xl" onClick={onAnimate}>
                <FaPlayCircle></FaPlayCircle>
            </button>

            <RxDividerVertical/>

            <button className="text-gray-700 text-xl" onClick={onPosition}>
                <FaLayerGroup></FaLayerGroup>
            </button>

            <RxDividerVertical/>

            {/* Paint Brush Icon */}
            <button className="text-gray-700 text-xl">
                <FaBrush></FaBrush>
            </button>
        </div>
    );
};

export default TextToolbar;
