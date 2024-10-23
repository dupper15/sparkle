import Header from "../../components/SharedComponents/Header/Header.jsx";
import Banner from "../../components/SharedComponents/Banner/Banner.jsx";
import CustomCarousel from "../../components/SharedComponents/Carousel/CustomCarousel.jsx";
import Footer from "../../components/SharedComponents/Footer/Footer.jsx";
import Sidebar from "../../components/SharedComponents/SideBar/Sidebar.jsx";

const HomePage = () => {
    return (<div className="w-screen h-screen flex flex-col">
        <header><Header/></header>
        <div className='flex w-screen flex-row'>
            <Sidebar/>
            <div className='w-[calc(100%-100px)] flex flex-col h-full ]'>
                <div className='flex items-center justify-center'>
                    <Banner></Banner>
                </div>
                <div className=''>
                    <div className='text-2xl font-bold'>Your recent design</div>
                    <div className='pr-8 w-full text-right underline text-[#0000EE] font-bold'><a href=''>See all</a>
                    </div>
                    <div className='pl-8 pr-8'><CustomCarousel></CustomCarousel></div>
                </div>
                <div className=''>
                    <div className='text-2xl font-bold'>Example</div>
                    <div className='pr-8 w-full text-right underline text-[#0000EE] font-bold'><a href=''>See all</a></div>
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

export default HomePage;