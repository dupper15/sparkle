import React, {useMemo} from 'react';
import useFontSelectorViewModel, {FontList} from './FontSelectorViewModel';

// eslint-disable-next-line react/prop-types
const FontSelector = ({handleFontFamilyChange, currentFont}) => {
    const {onFontFamilyChange} = useFontSelectorViewModel(handleFontFamilyChange, currentFont);

    const fontOptions = useMemo(() => {
        return FontList.map((font) => (<option
            key={font}
            value={font}
            style={{fontFamily: font}}
            className="text-sm"
        >
            {font}
        </option>));
    }, []);

    return (<div className="font-dropdown relative">
        <select
            value={currentFont}
            onChange={onFontFamilyChange}
            style={{fontFamily: currentFont}}
            className="text-gray-700 border-2 rounded px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm h-8 w-[160px]"
            aria-label="Select font"
        >
            {fontOptions}
        </select>
    </div>);
};

export default FontSelector;