import {
    FaAlignLeft,
    FaBold, FaBrush,
    FaItalic, FaLayerGroup, FaListUl, FaMagic, FaPlayCircle,
    FaStrikethrough,
    FaUnderline
} from "react-icons/fa";
import {RxDividerVertical, RxTransparencyGrid} from "react-icons/rx";
import FontSelector from "./SubComponents/FontSelector/FontSelector.jsx";
/* eslint react/prop-types: 0*/
const TextToolbar = ({
                         fontName = "Le Petit Cochon",
                         fontSize = 179,
                         onFontNameChange = () => {
                         },
                         onFontSizeChange = () => {
                         },
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
            <div className="flex items-center text-gray-700 font-medium rounded border-2 px-2">
                <button
                    className="text-lg px-1"
                    onClick={() => onFontSizeChange(fontSize - 1)}
                >
                    -
                </button>
                <span className="px-2">{fontSize}</span>
                <button
                    className="text-lg px-1"
                    onClick={() => onFontSizeChange(fontSize + 1)}
                >
                    +
                </button>
            </div>

            {/* Formatting */}
            <button className="text-gray-700 text-xl pr-2" onClick={onBoldToggle}>
                <FaBold></FaBold>
            </button>
            <button className="text-gray-700 text-xl pr-2" onClick={onItalicToggle}>
                <FaItalic></FaItalic>
            </button>
            <button className="text-gray-700 text-xl pr-2" onClick={onUnderlineToggle}>
                <FaUnderline></FaUnderline>
            </button>
            <button className="text-gray-700 text-xl pr-2" onClick={onStrikethroughToggle}>
                <FaStrikethrough></FaStrikethrough>
            </button>
            <button className="text-sm bg-purple-200 text-purple-700 px-2 rounded" onClick={onAllCapsToggle}>
                aA
            </button>

            {/* Alignment */}
            <button className="text-gray-700 text-xl pr-2" onClick={onChangeAlignment}>
                <FaAlignLeft></FaAlignLeft>
            </button>

            {/* List */}
            <button className="text-gray-700 text-xl" onClick={onList}>
                <FaListUl></FaListUl>
            </button>

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
