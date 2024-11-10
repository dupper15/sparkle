import {useState} from 'react';
import {FaBold, FaBorderStyle, FaCircle, FaCrop, FaItalic, FaStrikethrough, FaUnderline} from "react-icons/fa";
import {MdFormatColorText} from "react-icons/md";
import ColorPickerPanel from "../../../ColorPickerPanel/ColorPickerPanel.jsx";
import {PiFlipHorizontal} from "react-icons/pi";
import {
    RiBringForward,
    RiBringToFront,
    RiFlipHorizontalFill,
    RiFlipVerticalFill,
    RiSendBackward,
    RiSendToBack
} from "react-icons/ri";

const ImageTransformationSection = () => {
    const [isFlipMenuOpen, setIsFlipMenuOpen] = useState(false);
    const [isCropModeOpen, setOpenCropMode] = useState(false);

    const handleFlipClick = () => {
        setIsFlipMenuOpen(!isFlipMenuOpen);
    };
    const handleCropClick = () => {
        setOpenCropMode(prev => !prev);
    }
    // Similar functions for other formatting options

    return (
        <div className={'relative'}>
            <div className="h-8 toolbar flex">
                {/* Crop */}
                <button className="text-xl text-gray-700 pl-1 pr-1 mr-1" onClick={handleCropClick}>
                    <FaCrop/>
                </button>

                {/*flip*/}
                <button
                    className='text-gray-700 text-xl'
                    onClick={handleFlipClick}
                >
                    <div className={'flex h-full'}>
                        <span className={'text-purple-700 tex-sm'}>Flip</span>
                    </div>
                </button>
            </div>
            <div>
                {isFlipMenuOpen && (
                    <div className="absolute top-[6rem] right-[1rem] translate-x-[50%] translate-y-[-55%] shadow">
                        <FlipMenu/>
                    </div>
                )}
            </div>
            <div>
                {isCropModeOpen && {}}
            </div>
        </div>
    );
};

export default ImageTransformationSection;

const FlipMenu = () => {
    return (
        <div className="bg-white profile-dropdown box-border rounded-2xl text-sm text-gray-700 py-2">
            <button className="flex items-center rounded-md hover:bg-gray-200 px-2 py-2 w-40 mb-1">
                <RiFlipHorizontalFill className={'h-6 w-8 mr-2'}/>
                <span>Flip Horizontal</span>
            </button>
            <button className="flex items-center rounded-md hover:bg-gray-200 px-2 py-2 w-40 mt-1">
                <RiFlipVerticalFill className={'h-6 w-8 mr-2'}/>
                <span>Flip Vertical</span>
            </button>
        </div>
    );
};