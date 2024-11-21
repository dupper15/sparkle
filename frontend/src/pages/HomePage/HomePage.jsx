import Header from "../../components/SharedComponents/Header/Header.jsx";
import Banner from "../../components/SharedComponents/Banner/Banner.jsx";
import CustomCarousel from "../../components/SharedComponents/Carousel/CustomCarousel.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col bg-black">
      <header className="z-40">
        <Header />
      </header>
      <div className="flex w-full bg-black">
        <Sidebar />
        <div className="w-[calc(100%-100px)] flex flex-col h-full ">
          <div className="mr-auto ml-auto mt-8 mb-8">
            <Banner></Banner>
          </div>
          <div className="">
            <div className="flex justify-between items-center mx-10 my-2">
              <div className="text-2xl font-bold text-white w-max pointer-events-none">
                Your recent design
              </div>
              <a
                className="mr-0 text-right underline font-bold hover:text-[#4335DE]"
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
              <div className="text-2xl font-bold text-white w-max pointer-events-none">
                Your recent design
              </div>
              <a
                className="mr-0 text-right underline font-bold hover:text-[#4335DE]"
                href="">
                See all
              </a>
            </div>
            <div className="px-8">
              <CustomCarousel></CustomCarousel>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-black mt-4">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomePage;
