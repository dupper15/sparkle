import React from 'react';
import { RiFlipHorizontalFill, RiFlipVerticalFill } from "react-icons/ri";

/* eslint react/prop-types: 0 */
const ImageTransformationSection = ({
                                        selectedComponentHorizontalFlip,
                                        selectedComponentVerticalFlip,
                                        handleHorizontalFlipClick,
                                        handleVerticalFlipClick,
                                        activeTab,
                                        setActiveTab,
                                    }) => {
    return (
        <div className={'relative'}>
            <div className="h-8 toolbar flex">
                <button
                    className={`text-xl rounded pr-2 pl-2 text-gray-700 ${activeTab === 'flip' ? 'bg-purple-200 text-purple-700' : ''}`}
                    onClick={() => {
                        setActiveTab(activeTab === 'flip' ? '' : 'flip');
                    }}
                >
                    <div className={'flex h-full'}>
                        <span className={'text-purple-700 tex-sm'}>Flip</span>
                    </div>
                </button>
            </div>
            <div>
                {activeTab === 'flip' && (
                    <div className="absolute top-[6rem] right-[1rem] translate-x-[50%] translate-y-[-55%] shadow">
                        <FlipMenu
                            selectedComponentHorizontalFlip={selectedComponentHorizontalFlip}
                            selectedComponentVerticalFlip={selectedComponentVerticalFlip}
                            handleHorizontalFlipClick={handleHorizontalFlipClick}
                            handleVerticalFlipClick={handleVerticalFlipClick}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageTransformationSection;

const FlipMenu = ({
                      selectedComponentHorizontalFlip,
                      selectedComponentVerticalFlip,
                      handleHorizontalFlipClick,
                      handleVerticalFlipClick
                  }) => {
    return (
        <div className="bg-white profile-dropdown box-border rounded-2xl text-sm text-gray-700 py-2">
            <button
                className={`flex items-center rounded-md hover:bg-gray-200 px-2 py-2 w-40 mb-1 ${selectedComponentHorizontalFlip ? 'bg-gray-300' : ''}`}
                onClick={handleHorizontalFlipClick}
            >
                <RiFlipHorizontalFill className={'h-6 w-8 mr-2'}/>
                <span>Flip Horizontal</span>
            </button>
            <button
                className={`flex items-center rounded-md hover:bg-gray-200 px-2 py-2 w-40 mt-1 ${selectedComponentVerticalFlip ? 'bg-gray-300' : ''}`}
                onClick={handleVerticalFlipClick}
            >
                <RiFlipVerticalFill className={'h-6 w-8 mr-2'}/>
                <span>Flip Vertical</span>
            </button>
        </div>
    );
};