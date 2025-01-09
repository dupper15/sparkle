import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";
import ResponsiveGrid from "../../components/SharedComponents/ResponsiveGrid/ResponsiveGrid.jsx";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import SlideBanner from "./../../components/SlideBanner/SlideBanner";

const ProjectPage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`h-screen flex flex-col overflow-y-auto ${
        isDarkMode ? "bg-[#101010]" : "bg-white"
      }`}>
      <header className='z-40'>
        <Header />
      </header>
      <div
        className={`flex w-full flex-row ${
          isDarkMode ? "bg-[#101010] text-white" : "bg-white text-black"
        }`}>
        <Sidebar />
        <div className='w-[calc(100%-80px)] flex flex-col h-full pb-5'>
          <div className=' w-full mt-2 mb-4 pr-10 pl-12'>
            {/* <Banner></Banner> */}
            <SlideBanner></SlideBanner>
          </div>
          <div className=''>
            <div className='ml-12 text-2xl font-bold w-max pointer-events-none'>
              Your project
            </div>
            <div>
              <ResponsiveGrid />
            </div>
          </div>
        </div>
      </div>
      <div className=''>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectPage;
