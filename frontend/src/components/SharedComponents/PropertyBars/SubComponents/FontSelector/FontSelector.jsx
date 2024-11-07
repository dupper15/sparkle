// eslint-disable-next-line react/prop-types
const FontSelector = ({fontName}) => {
    return (
        <div className="dropdown">
                {/*{FontList.map((fontName, index) => (*/}
                {/*    <li key={index}>*/}
                {/*        <a style={{fontFamily: fontName}}>{fontName}</a>*/}
                {/*    </li>*/}
                {/*))}*/}
        </div>

        // <button
        //     className="px-3 py-1 rounded border-2 text-gray-700 font-medium text-sm min-w-[100px]"
        //     onClick={onFontNameChange}>
        //     {fontName}
        // </button>
    )
}

export default FontSelector

function onFontNameChange() {

}

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
    'Comic Sans MS'
];