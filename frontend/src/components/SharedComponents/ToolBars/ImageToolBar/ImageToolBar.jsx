// frontend/src/components/SharedComponents/ToolBars/ImageToolBar/ImageToolBar.jsx
import React from "react";
import { RxDividerVertical } from "react-icons/rx";
import PositionEditSection from "../SubComponents/PositionEditSection/PositionEditSection.jsx";
import ImageStylesEditSection from "../SubComponents/ImageStylesEditSection/ImageStylesEditSection.jsx";
import ImageTransformationSection from "../SubComponents/ImageTransformationSection/ImageTransformationSection.jsx";
import useImageToolbarViewModel from "./ImageToolbarViewModel";

const ImageToolbar = () => {
    const { selectedComponentId, handleImageClick } = useImageToolbarViewModel();

    return (
        <div className="h-[48px] inline-flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md ">
            {/* Edit Image */}
            {/*<button className="pl-1 flex flex-row py-1 text-gray-700" onClick={onEditImage}>*/}
            {/*    <FaImage className='text-xl mt-auto mb-auto mr-2'/>*/}
            {/*    <span>Edit</span>*/}
            {/*</button>*/}

            {/*<RxDividerVertical />*/}

            {/* Color Selector */}
            <ImageStylesEditSection />

            <RxDividerVertical />

            {/* Crop */}
            <ImageTransformationSection />

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
            <PositionEditSection />
        </div>
    );
};

export default ImageToolbar;