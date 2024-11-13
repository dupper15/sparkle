import React, { useState, useMemo } from 'react';

// eslint-disable-next-line react/prop-types
const FontSelector = ({ string: fontName }) => {
    const [selectedFont, setSelectedFont] = useState(FontList[0]);
    const  onFontChange =()=>{
    }
    const fontOptions = useMemo(() => {
        return FontList.map((font) => (
            <option
                key={font}
                value={font}
                style={{ fontFamily: font }}
                className="text-sm"
            >
                {font}
            </option>
        ));
    }, []);

    const handleChange = (event) => {
        const newFont = event.target.value;
        if (FontList.includes(newFont)) {
            setSelectedFont(newFont);
        }
    };

    return (
        <div className="font-dropdown relative">
            <select
                value={selectedFont}
                onChange={handleChange}
                style={{ fontFamily: selectedFont }}
                className="text-gray-700 border-2 rounded px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm h-8 w-[160px]"
                aria-label="Select font"
            >
                {fontOptions}
            </select>
        </div>
    );
};

export default FontSelector;

const FontList = [
    'Arial',
    'Times New Roman',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Calibri',
    'Courier New',
    'Georgia',
    'Impact',
    'Comic Sans MS',
];