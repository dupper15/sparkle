import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";
import ProjectPageBanner from "../../components/ProjectPageComponents/Banner/ProjectPageBanner.jsx";
import ResponsiveGrid from "../../components/SharedComponents/ResponsiveGrid/ResponsiveGrid.jsx";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";

const ProjectPage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={`h-screen flex flex-col overflow-y-auto ${
        isDarkMode ? "bg-[#101010]" : "bg-white"
      }`}>
      <header className="z-40">
        <Header />
      </header>
      <div
        className={`flex w-full flex-row ${
          isDarkMode ? "bg-[#101010] text-white" : "bg-white text-black"
        }`}>
        <Sidebar />
        <div className="w-[calc(100%-100px)] flex flex-col h-full ]">
          <div className="mr-auto ml-auto mt-8 mb-8">
            <ProjectPageBanner></ProjectPageBanner>
          </div>
          <div className="">
            <div className="text-2xl font-bold">Your Projects</div>
            <div className="pl-8 pr-8">
              <ResponsiveGrid></ResponsiveGrid>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Footer />
      </div>
    </div>
  );
};

export default ProjectPage;
