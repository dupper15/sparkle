import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";
import TemplatePageBanner from "../../components/TemplatePageComponents/Banner/TemplatePageBanner.jsx";
import ResponsiveGrid from "../../components/SharedComponents/ResponsiveGrid/ResponsiveGrid.jsx";

const TemplatePage = () => {
    return (<div className="h-screen flex flex-col">
        <header className='z-40'><Header/></header>
        <div className='flex w-full flex-row'>
            <Sidebar/>
            <div className='w-[calc(100%-100px)] flex flex-col h-full ]'>
                <div className='mr-auto ml-auto mt-8 mb-8'>
                    <TemplatePageBanner></TemplatePageBanner>
                </div>
                <div className=''>
                    <div className='text-2xl font-bold'>Trending</div>
                    <div className='pl-8 pr-8'><ResponsiveGrid></ResponsiveGrid></div>
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