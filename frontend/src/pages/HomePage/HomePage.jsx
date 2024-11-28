import Header from "../../components/SharedComponents/Header/Header.jsx";
import Banner from "../../components/SharedComponents/Banner/Banner.jsx";
import CustomCarousel from "../../components/SharedComponents/Carousel/CustomCarousel.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";
import { useDarkMode } from "../../contexts/DarkModeContext.jsx";
import { useSelector } from "react-redux";
import CarouselTeamProject from "../../components/SharedComponents/Carousel/CarouselTeamProject.jsx";

const HomePage = () => {
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
        className={`flex w-full ${
          isDarkMode ? "bg-[#101010] text-white" : "bg-white text-black"
        }`}>
        <Sidebar />
        <div className="w-[calc(100%-100px)] flex flex-col h-full ">
          <div className="mr-auto ml-auto mt-8 mb-8">
            <Banner></Banner>
          </div>
          <div className="">
            <div className="flex justify-between items-center mx-10 my-2">
              <div className="ml-2 text-2xl font-bold w-max pointer-events-none">
                Your recent design
              </div>
              <a
                className="mr-2 text-right underline font-bold hover:text-[#4335DE]"
                href="">
                See all
              </a>
            </div>
            <div className="px-8">
              <CustomCarousel></CustomCarousel>
            </div>
          </div>
          <div className="">
            <div className="flex justify-between items-center mx-10 my-2">
              <div className="ml-2 text-2xl font-bold w-max pointer-events-none">
                Team projects
              </div>
              <a
                className="mr-2 text-right underline font-bold hover:text-[#4335DE]"
                href="">
                See all
              </a>
            </div>
            <div className="px-8">
              <CarouselTeamProject/>
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

export default HomePage;
