import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaAdjust } from 'react-icons/fa';

const OpacitySlider = ({ currentOpacity, handleComponentOpacityChange }) => {
    const [openOpacitySlider, setOpenOpacitySlider] = useState(false);

    const handleIconClick = () => {
        setOpenOpacitySlider(!openOpacitySlider);
    };

    const handleInputChange = (e) => {
        let newOpacity = e.target.value;
        if (!isNaN(newOpacity) && newOpacity !== '') {
            newOpacity = Number(newOpacity);
            if (newOpacity < 0) newOpacity = 0;
            if (newOpacity > 100) newOpacity = 100;
            handleComponentOpacityChange(newOpacity / 100);
            console.log("Opacity", newOpacity)
        }
    };

    return (
        <div className="relative">
            <button className="text-xl p-2 text-gray-700" onClick={handleIconClick}>
                <FaAdjust />
            </button>
            {openOpacitySlider && (
                <div className="absolute top-full translate-x-[-40%] translate-y-[0%] mt-2 p-2 bg-white border rounded shadow-lg">
                    <div className="flex flex-col items-center">
                        <label htmlFor="opacity-range" className="text-gray-700 mb-2">
                            Opacity:
                        </label>
                        <div className="flex items-center w-full">
                            <input
                                type="range"
                                id="opacity-range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={currentOpacity}
                                onChange={(e) => handleComponentOpacityChange(e.target.value)}
                                className="flex-grow mr-2"
                            />
                            <input
                                type="text"
                                value={Math.round(currentOpacity * 100)}
                                onChange={handleInputChange}
                                className="w-16 text-center"
                                style={{
                                    appearance: 'textfield',
                                    MozAppearance: 'textfield',
                                    WebkitAppearance: 'none'
                                }}
                                onKeyDown={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

OpacitySlider.propTypes = {
    currentOpacity: PropTypes.number.isRequired,
    handleComponentOpacityChange: PropTypes.func.isRequired,
};

export default OpacitySlider;