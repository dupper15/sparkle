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
import PositionEditSection from "./SubComponents/PositionEditSection/PositionEditSection.jsx";
import ImageStylesEditSection from "./SubComponents/ImageStylesEditSection/ImageStylesEditSection.jsx";
import ImageTransformationSection from "./SubComponents/ImageTransformationSection/ImageTransformationSection.jsx";

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
            {/*<button className="pl-1 flex flex-row py-1 text-gray-700" onClick={onEditImage}>*/}
            {/*    <FaImage className='text-xl mt-auto mb-auto mr-2'/>*/}
            {/*    <span>Edit</span>*/}
            {/*</button>*/}

            {/*<RxDividerVertical />*/}

            {/* Color Selector */}
            <ImageStylesEditSection></ImageStylesEditSection>

            <RxDividerVertical />

            {/* Crop */}
            <ImageTransformationSection></ImageTransformationSection>

            <RxDividerVertical />

            {/* Transparency */}
            {/*<button className="text-gray-700 text-xl" onClick={onTransparency}>*/}
            {/*    <RxTransparencyGrid />*/}
            {/*</button>*/}

            {/*<RxDividerVertical />*/}

            {/*/!* Animation *!/*/}
            {/*<button className="text-gray-700 text-xl" onClick={onAnimate}>*/}
            {/*    <MdAnimation />*/}
            {/*</button>*/}

            {/*<RxDividerVertical />*/}

            {/* Position */}
            <PositionEditSection></PositionEditSection>
        </div>
    );
};

export default ImageToolbar;
