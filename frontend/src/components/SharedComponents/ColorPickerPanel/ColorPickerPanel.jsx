import {useState} from "react";
import {HexColorInput, HexColorPicker} from "react-colorful";

// eslint-disable-next-line react/prop-types
const ColorPickerPanel = ({colorPanelCloseRequest}) => {
    const [activeColor, setActiveColor] = useState("#aabbcc");
    const solidColorArray = [
        {name: 'Black', hex: '#000000'},
        {name: 'Dark Gray', hex: '#333333'},
        {name: 'Gray', hex: '#666666'},
        {name: 'Light Gray', hex: '#999999'},
        {name: 'Very Light Gray', hex: '#CCCCCC'},
        {name: 'White', hex: '#FFFFFF'},
        {name: 'Red', hex: '#FF0000'},
        {name: 'Light Red', hex: '#FF6666'},
        {name: 'Pink', hex: '#FFCCCC'},
        {name: 'Light Purple', hex: '#CCCCFF'},
        {name: 'Purple', hex: '#FF00FF'},
        {name: 'Dark Purple', hex: '#800080'},
        {name: 'Teal', hex: '#008080'},
        {name: 'Light Blue', hex: '#66CCFF'},
        {name: 'Cyan', hex: '#00FFFF'},
        {name: 'Light Cyan', hex: '#CCFFFF'},
        {name: 'Blue', hex: '#0000FF'},
        {name: 'Dark Blue', hex: '#000080'},
        {name: 'Green', hex: '#00FF00'},
        {name: 'Light Green', hex: '#99FF99'},
        {name: 'Yellow', hex: '#FFFF00'},
        {name: 'Light Yellow', hex: '#FFFF99'},
        {name: 'Orange', hex: '#FFA500'},
        {name: 'Light Orange', hex: '#FFCC99'},
    ];
    const handleColorHover = (color) => {
        setActiveColor(color.hex);
    };

    const handleColorLeave = () => {
        setActiveColor(solidColorArray[0].hex);
    };

    return (
        <div className="w-80 bg-white rounded-lg shadow-lg p-4 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium ">Colour</h2>
                <button
                    className="text-2xl text-gray-500 hover:text-gray-700"
                    onClick={() => colorPanelCloseRequest(false)}
                >&times;
                </button>
            </div>

            {/* Search Box */}
            <div className="relative mt-4 mb-2">
                <HexColorInput
                    placeholder='Try "#00c4cc"'
                    className="bg-white w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    color={activeColor}
                    onChange={setActiveColor}/>
                <span className="absolute left-3 top-1.5 text-gray-500">
          &#128269;
        </span>
            </div>
            {/*Color gradient section*/}
            <div className={'w-full'}>
                <HexColorPicker
                    style={{width: '100%'}}
                    color={activeColor}
                    onChange={setActiveColor}/>
            </div>

            {/* Solid Colors Section */}
            <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Solid colours</h3>
                <div className="grid grid-cols-6 gap-2">
                    {solidColorArray.map((color, index) => (
                        <div
                            key={index}
                            className={`w-8 h-8 rounded-md cursor-pointer border hover:bg-gray-200`}
                            // onMouseEnter={() => handleColorHover(color)}
                            // onMouseLeave={handleColorLeave}
                            style={{backgroundColor: color.hex}}
                        >
                            {/*{activeColor && (*/}
                            {/*    <div className="toast absolute bottom-0 left-0 w-full py-2 px-4 bg-gray-700 text-white rounded-t-lg shadow-md">*/}
                            {/*        <p>{activeColor.name} - {activeColor.hex}</p>*/}
                            {/*    </div>*/}
                            {/*)}*/}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorPickerPanel