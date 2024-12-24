import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";
import TemplatePageBanner from "../../components/TemplatePageComponents/Banner/TemplatePageBanner.jsx";
import ResponsiveGridTemplate from "../../components/SharedComponents/ResponsiveGrid/ResponsiveGridTemplate.jsx";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";

const TemplatePage = () => {
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
        <div className='w-[calc(100%-100px)] flex flex-col h-full ]'>
          <div className='mr-auto ml-auto mt-8 mb-8'>
            <TemplatePageBanner></TemplatePageBanner>
          </div>
          <div className=''>
            <div className='text-2xl font-bold'>Trending</div>
            <div className='pl-8 pr-8'>
              <ResponsiveGridTemplate />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <Footer />
      </div>
    </div>
  );
};

export default TemplatePage;
