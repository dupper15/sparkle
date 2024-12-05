import { useState } from 'react';
import { FaLayerGroup } from 'react-icons/fa';
import { RiBringForward, RiBringToFront, RiSendBackward, RiSendToBack } from "react-icons/ri";

/* eslint react/prop-types: 0 */
const PositionEditSection = ({ handleSendBackward, handleSendToBack, handleSendForward, handleSendToFront }) => {
    const [isPositionMenuOpen, setIsPositionMenuOpen] = useState(false);

    const handleLayerClick = () => {
        setIsPositionMenuOpen(!isPositionMenuOpen);
    };

    return (
        <div className="relative toolbar flex h-8">
            <button
                className="text-gray-700 text-xl pr-2 mr-1"
                onClick={handleLayerClick}
            >
                <FaLayerGroup />
            </button>
            {isPositionMenuOpen && (
                <div className="absolute top-[6rem] right-[1rem] translate-x-[50%] translate-y-[-55%] shadow">
                    <PositionMenu
                        onSendBackward={handleSendBackward}
                        onSendToBack={handleSendToBack}
                        onSendForward={handleSendForward}
                        onSendToFront={handleSendToFront}
                    />
                </div>
            )}
        </div>
    );
};

const PositionMenu = ({ onSendBackward, onSendToBack, onSendForward, onSendToFront }) => {
    return (
        <div className="inline-flex bg-white profile-dropdown box-border rounded-2xl text-sm text-gray-700">
            <div className="flex flex-col space-y-2 px-4 py-1">
                <button className="flex items-center rounded-md hover:bg-gray-100" onClick={onSendBackward}>
                    <RiSendBackward className="h-6 w-6 mr-2" />
                    <span>Send Backward</span>
                </button>
                <button className="flex items-center rounded-md hover:bg-gray-100" onClick={onSendToBack}>
                    <RiSendToBack className="h-6 w-6 mr-2" />
                    <span>Send To Back</span>
                </button>
            </div>
            <div className="flex flex-col space-y-2 pr-4 py-1">
                <button className="flex items-center rounded-md hover:bg-gray-100" onClick={onSendForward}>
                    <RiBringForward className="h-6 w-8 mr-2" />
                    <span>Bring Forward</span>
                </button>
                <button className="flex items-center rounded-md hover:bg-gray-100" onClick={onSendToFront}>
                    <RiBringToFront className="h-6 w-8 mr-2" />
                    <span>Send To Front</span>
                </button>
            </div>
        </div>
    );
};

export default PositionEditSection;