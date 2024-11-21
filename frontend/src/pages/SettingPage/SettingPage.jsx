import Header from "../../components/SharedComponents/Header/Header.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import SettingSideBar from "../../components/SettingSideBar/SettingSideBar.jsx";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";

const SettingPage = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-white transition-colors duration-500 dark:bg-[#101010]">
      <header>
        <Header className="fixed top-0 left-0 w-full z-50" />
      </header>
      <div className="flex flex-grow w-screen">
        <div className="w-[55px] md:w-[80px] z-50 h-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          <SettingSideBar />
        </div>
        <div className="flex flex-col w-[calc(100%-50px)] md:w-[calc(100%-80px)] overflow-y-auto text-black dark:text-white gap-4 ps-14 pe-20 scrollbar-hide">
          <span className="font-bold text-xl md:text-3xl pointer-events-none">
            Settings
          </span>
          <div className="flex flex-row items-center w-max md:w-full h-[auto] border-2 border-black dark:border-white rounded-lg my-2 py-3 px-2">
            <div className="flex flex-col space-y-2">
              <span className="font-semibold text-xl pointer-events-none">
                Dark mode
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`ml-auto inline-flex items-center h-8 px-4 rounded-full transition-colors hover:bg-slate-400 duration-300 ${
                isDarkMode ? "bg-white" : "bg-black"
              }`}>
              <span
                className={`w-8 ${isDarkMode ? "text-black" : "text-white"}`}>
                {isDarkMode ? "ON" : "OFF"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Footer />
      </div>
    </div>
  );
};

export default SettingPage;
