import demo from "../../assets/bg-dm.png";

const TemplateDesign = () => {
    return(
        <>
           {
                [1,2,3,4].map((design,i) => <div className={` group w-full rounded-md overflow-hidden bg-[#ffffff] cursor-pointer`}>
                    <img className='w-full h-full' src="demo" alt=""/>
                </div>)
           }
        </>
    );
};

export default TemplateDesign;