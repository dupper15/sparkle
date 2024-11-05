import {
    FaImage,
    FaCircle,
    FaCrop,
    FaLayerGroup,
    FaBorderStyle,
    FaBrush,
} from "react-icons/fa";
import {RxDividerVertical, RxTransparencyGrid} from "react-icons/rx";
import { MdAnimation } from "react-icons/md";

/* eslint react/prop-types: 0 */
const ImageToolbar = ({
                         onEditImage = () => {},
                         onColorChange = () => {},
                         onAlign = () => {},
                         onCrop = () => {},
                         onFlip = () => {},
                         onTransparency = () => {},
                         onAnimate = () => {},
                         onEffects = () => {},
                     }) => {
    return (
        <div className="h-[48px] inline-flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md ">
            {/* Edit Image */}
            <button className="pl-1 flex flex-row py-1 text-gray-700" onClick={onEditImage}>
                <FaImage className='text-xl mt-auto mb-auto mr-2'/>
                <span>Edit</span>
            </button>

            <RxDividerVertical />

            {/* Color Selector */}
            <button className="text-xl text-amber-950" onClick={onColorChange}>
                <FaCircle />
            </button>

            {/* Border */}
            <button className="text-gray-700 pl-2 text-xl" onClick={onAlign}>
                <FaBorderStyle />
            </button>

            <RxDividerVertical />

            {/* Crop */}
            <button className="text-gray-700 text-xl" onClick={onCrop}>
                <FaCrop />
            </button>

            {/* Flip */}
            <button className="pl-2 text-purple-700 mt-auto mb-auto" onClick={onFlip}>
                Flip
            </button>

            <RxDividerVertical />

            {/* Transparency */}
            <button className="text-gray-700 text-xl" onClick={onTransparency}>
                <RxTransparencyGrid />
            </button>

            <RxDividerVertical />

            {/* Animation */}
            <button className="text-gray-700 text-xl" onClick={onAnimate}>
                <MdAnimation />
            </button>

            <RxDividerVertical />

            {/* Position */}
            <button className="text-gray-700 text-xl" onClick={onEffects}>
                <FaLayerGroup />
            </button>

            <RxDividerVertical />

            {/* Paint */}
            <button className="text-gray-700 text-xl">
                <FaBrush />
            </button>
        </div>
    );
};

export default ImageToolbar;
