import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";
import TemplatePageBanner from "../../components/TemplatePageComponents/Banner/TemplatePageBanner.jsx";
import ResponsiveGridTemplate from "../../components/SharedComponents/ResponsiveGrid/ResponsiveGridTemplate.jsx";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import SlideBanner from "./../../components/SlideBanner/SlideBanner";

const TemplatePage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`h-screen flex flex-col overflow-y-auto ${
        isDarkMode ? "bg-[#101010]" : "bg-white"
      }`}>
      {/* Header */}
      <header className='z-40'>
        <Header />
      </header>

      {/* Main Content */}
      <div
        className={`flex flex-1 ${
          isDarkMode ? "bg-[#101010] text-white" : "bg-white text-black"
        }`}>
        {/* Sidebar */}
        <Sidebar className='hidden sm:flex w-[80px] lg:w-[100px] flex-col items-center' />

        {/* Main Section */}
        <div className='w-full md:w-[calc(100%-80px)] flex flex-col h-full pb-5'>
          {/* Slide Banner */}
          <div className='w-full md:mt-2 md:mb-4 px-4 md:pr-10 md:pl-12'>
            <SlideBanner />
          </div>

          {/* Trending Section */}
          <div className=''>
            <div className='text-xl md:text-2xl font-bold mt-2 ml-4 md:ml-10'>
              Trending
            </div>
            <ResponsiveGridTemplate />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TemplatePage;
