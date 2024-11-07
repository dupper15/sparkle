import { useState } from "react";

// eslint-disable-next-line react/prop-types
const FontSizeField = ({number: initialFontSize = 40 }) => {
    const maxValue = 200;
    const minValue = 0;
    const [fontSize, setFontSize] = useState(initialFontSize);

    const handleFontSizeChange = (event) => {
        const newFontSize = parseInt(event.target.value, 10);
        if (!isNaN(newFontSize) && newFontSize >= minValue && newFontSize <= maxValue) {
            setFontSize(newFontSize);
        }
    };

    const handleIncrement = () => {
        setFontSize(fontSize + 1);
    };

    const handleDecrement = () => {
        setFontSize(fontSize - 1);
    };

    return (
        <div className="flex items-center text-gray-700 font-medium rounded border-2 px-2">
            <button
                className="text-lg pr-1"
                onClick={handleDecrement}
                disabled={fontSize <= 1}
            >
                -
            </button>
            <input
                id="valueInput"
                type="text"
                value={fontSize}
                onChange={handleFontSizeChange}
                className="bg-white text-black w-8 text-center focus: outline-none"
                maxLength={maxValue}
                minLength={minValue}
            />
            <button
                className="text-lg pl-0.5"
                onClick={handleIncrement}
                disabled={fontSize >= 100} // Adjust max font size as needed
            >
                +
            </button>
        </div>
    );
};

export default FontSizeField;