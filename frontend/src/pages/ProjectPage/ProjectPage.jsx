import Header from "../../components/SharedComponents/Header/Header.jsx";
import Banner from "../../components/SharedComponents/Banner/Banner.jsx";
import CustomCarousel from "../../components/SharedComponents/Carousel/CustomCarousel.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";
import ProjectPageBanner from "../../components/ProjectPageComponents/Banner/ProjectPageBanner.jsx";

const ProjectPage = () => {
    return (<div className="w-screen h-screen flex flex-col">
        <header><Header/></header>
        <div className='flex w-screen flex-row'>
            <Sidebar/>
            <div className='w-[calc(100%-100px)] flex flex-col h-full ]'>
                <div className=' items-center justify-center'>
                    <ProjectPageBanner></ProjectPageBanner>
                </div>
                <div className=''>
                    <div className='text-2xl font-bold'>Your Projects</div>
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

export default ProjectPage;