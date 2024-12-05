import TextPropertyBar from "../../components/SharedComponents/ToolBars/TextToolBar/TextToolBar.jsx";
import ShapeToolBar from "../../components/SharedComponents/ToolBars/ImageToolBar/ShapeToolBar.jsx";
import ColorPickerPanel
    from "../../components/SharedComponents/ColorPickerPanel/ColorPickerPanel.jsx";

const TestingPage =()=>{
    return(
        <div>
            <TextPropertyBar/>
            <ShapeToolBar/>
            <ColorPickerPanel></ColorPickerPanel>
        </div>

    )

}

export default TestingPage;