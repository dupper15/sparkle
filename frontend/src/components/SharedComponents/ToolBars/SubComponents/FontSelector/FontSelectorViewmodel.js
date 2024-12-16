import {useState} from 'react';

const useFontSelectorViewModel = (handleFontFamilyChange) => {
    const [currentFont, setCurrentFont] = useState('Arial');

    const onFontFamilyChange = (event) => {
        try {
            const newFont = event.target.value;
            if (FontList.includes(newFont)) {
                setCurrentFont(newFont);
                handleFontFamilyChange(newFont);
            } else {
                throw new Error("Selected font is not in the font list.");
            }
        } catch (error) {
            console.error("Error changing font family:", error);
        }
    };

    return {
        currentFont, onFontFamilyChange,
    };
};

const FontList = ['Arial', 'Times New Roman', 'Verdana', 'Helvetica', 'Tahoma', 'Calibri', 'Courier New', 'Georgia', 'Impact', 'Comic Sans MS',];

export default useFontSelectorViewModel;
export {FontList};