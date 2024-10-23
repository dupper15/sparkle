import Header from "../../components/SharedComponents/Header/Header.jsx";
import CustomCarousel from "../../components/SharedComponents/Carousel/CustomCarousel.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";
import TemplatePageBanner from "../../components/TemplatePageComponents/Banner/TemplatePageBanner.jsx";

const TemplatePage = () => {
    return (<div className="w-screen h-screen flex flex-col">
        <header><Header/></header>
        <div className='flex w-screen flex-row'>
            <Sidebar/>
            <div className='w-[calc(100%-100px)] flex flex-col h-full ]'>
                <div className=' items-center justify-center'>
                    <TemplatePageBanner></TemplatePageBanner>
                </div>
                <div className=''>
                    <div className='text-2xl font-bold'>Trending</div>
                    <div className='pl-8 pr-8'><CustomCarousel></CustomCarousel></div>
                </div>
            </div>
        </div>
        <hr/>
        <footer>
            <Footer></Footer>
        </footer>
    </div>)
}

export default TemplatePage;