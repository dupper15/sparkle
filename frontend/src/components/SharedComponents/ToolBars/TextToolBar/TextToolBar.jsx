import { RxDividerVertical } from "react-icons/rx";
import FontSelector from "../SubComponents/FontSelector/FontSelector.jsx";
import FontSizeField from "../SubComponents/FontSizeField/FontSizeField.jsx";
import ParagraphFormatSection from "../SubComponents/ParagraphFormatSection/ParagraphFormatSection.jsx";
import TextFormatSection from "../SubComponents/TextFormatSection/TextFormatSection.jsx";
import PositionEditSection from "../SubComponents/PositionEditSection/PositionEditSection.jsx";
/* eslint react/prop-types: 0*/
const TextToolbar = () => {
  return (
    <div className="h-[48px] inline-flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md border">
      {/* Font */}
      <FontSelector fontName="Ariel"></FontSelector>

      {/* Font Size */}
      <FontSizeField></FontSizeField>

      {/* Text Formatting */}
      <TextFormatSection></TextFormatSection>

      <RxDividerVertical />

      {/* Paragraph Formatting */}
      <ParagraphFormatSection></ParagraphFormatSection>

      <RxDividerVertical />

      {/*/!* Transparency *!/*/}
      {/*<button className="text-black text-xl" onClick={onChangeTransparency}>*/}
      {/*    <RxTransparencyGrid/>*/}
      {/*</button>*/}

      {/*<RxDividerVertical/>*/}

      {/*/!* Effects *!/*/}
      {/*<button className="bg-purple-200 text-purple-700 px-2 rounded text-xl" onClick={onEffects}>*/}
      {/*    <FaMagic></FaMagic>*/}
      {/*</button>*/}

      {/*<RxDividerVertical/>*/}

      {/*/!* Animate and Position *!/*/}
      {/*<button className="text-gray-700 text-xl" onClick={onAnimate}>*/}
      {/*    <FaPlayCircle></FaPlayCircle>*/}
      {/*</button>*/}

      {/*<RxDividerVertical/>*/}

      <PositionEditSection></PositionEditSection>
    </div>
  );
};

export default TextToolbar;
