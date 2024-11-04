import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";
import ProjectPageBanner from "../../components/ProjectPageComponents/Banner/ProjectPageBanner.jsx";
import ResponsiveGrid from "../../components/SharedComponents/ResponsiveGrid/ResponsiveGrid.jsx";

const ProjectPage = () => {
    return (<div className="h-screen flex flex-col">
        <header className='z-40'><Header/></header>
        <div className='flex w-full flex-row'>
            <Sidebar/>
            <div className='w-[calc(100%-100px)] flex flex-col h-full ]'>
                <div className='mr-auto ml-auto mt-8 mb-8'>
                    <ProjectPageBanner></ProjectPageBanner>
                </div>
                <div className=''>
                    <div className='text-2xl font-bold'>Your Projects</div>
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

export default ProjectPage;