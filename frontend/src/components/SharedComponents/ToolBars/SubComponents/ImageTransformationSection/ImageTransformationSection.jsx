import React from 'react';
import { FaCrop } from "react-icons/fa";
import { RiFlipHorizontalFill, RiFlipVerticalFill } from "react-icons/ri";

/* eslint react/prop-types: 0 */
const ImageTransformationSection = ({
                                        isFlipMenuOpen,
                                        handleFlipClick,
                                        handleCropClick,
                                        setIsFlipMenuOpen,
                                        setOpenCropMode,
                                        handleHorizontalFlipClick,
                                        handleVerticalFlipClick,
                                    }) => {
    return (
        <div className={'relative'}>
            <div className="h-8 toolbar flex">
                {/* Crop */}
                <button className="text-xl text-gray-700 pl-1 pr-1 mr-1" onClick={handleCropClick}>
                    <FaCrop />
                </button>

                {/* Flip */}
                <button className='text-gray-700 text-xl' onClick={handleFlipClick}>
                    <div className={'flex h-full'}>
                        <span className={'text-purple-700 tex-sm'}>Flip</span>
                    </div>
                </button>
            </div>
            <div>
                {isFlipMenuOpen && (
                    <div className="absolute top-[6rem] right-[1rem] translate-x-[50%] translate-y-[-55%] shadow">
                        <FlipMenu
                            handleHorizontalFlipClick={handleHorizontalFlipClick}
                            handleVerticalFlipClick={handleVerticalFlipClick}
                        />
                    </div>
                )}
            </div>
            <div>
                {/* {isCropModeOpen && {}} */}
            </div>
        </div>
    );
};

export default ImageTransformationSection;

 
const FlipMenu = ({ handleHorizontalFlipClick, handleVerticalFlipClick }) => {
    return (
        <div className="bg-white profile-dropdown box-border rounded-2xl text-sm text-gray-700 py-2">
            <button className="flex items-center rounded-md hover:bg-gray-200 px-2 py-2 w-40 mb-1"
                    onClick={handleHorizontalFlipClick}>
                <RiFlipHorizontalFill className={'h-6 w-8 mr-2'} />
                <span>Flip Horizontal</span>
            </button>
            <button className="flex items-center rounded-md hover:bg-gray-200 px-2 py-2 w-40 mt-1"
                    onClick={handleVerticalFlipClick}>
                <RiFlipVerticalFill className={'h-6 w-8 mr-2'} />
                <span>Flip Vertical</span>
            </button>
        </div>
    );
};