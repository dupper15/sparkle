import TextPropertyBar from "../../components/SharedComponents/ToolBars/TextToolBar.jsx";
import ImageToolbar from "../../components/SharedComponents/ToolBars/ImageToolBar/ImageToolBar.jsx";
import ColorPickerPanel
    from "../../components/SharedComponents/ColorPickerPanel/ColorPickerPanel.jsx";

const TestingPage =()=>{
    return(
        <div>
            <TextPropertyBar/>
            <ImageToolbar/>
            <ColorPickerPanel></ColorPickerPanel>
        </div>

    )

}

export default TestingPage;