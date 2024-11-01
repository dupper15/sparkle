import CustomizeSizeDialogue from "../../components/dialogs/CustomizeSizeDialogue.jsx";

const TestingPage =()=>{
    return(
        <div>
            <CustomizeSizeDialogue></CustomizeSizeDialogue>
            <div className='h-[100px] w-[100px] bg-amber-200'></div>
        </div>
    )

}

export default TestingPage;