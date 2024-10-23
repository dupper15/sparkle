import HomePageHeader from "../../components/HomePageComponents/Header/HomePageHeader.jsx";
import HomePageBanner from "../../components/HomePageComponents/Banner/HomePageBanner.jsx";
import HomePageCarousel from "../../components/HomePageComponents/Carousel/HomePageCarousel.jsx";
import HomePageFooter from "../../components/HomePageComponents/HomePageFooter/HomePageFooter.jsx";
import HomePageSidebar from "../../components/HomePageComponents/HomePageSideBar/HomePageSidebar.jsx";

const HomePage = () => {
    return (<div className="w-screen h-screen flex flex-col">
        <header><HomePageHeader/></header>
        <div className='flex w-screen flex-row'>
            <HomePageSidebar/>
            <div className='w-[calc(100%-100px)] flex flex-col h-full ]'>
                <div className='flex items-center justify-center'>
                    <HomePageBanner></HomePageBanner>
                </div>
                <div className=''>
                    <div className='text-2xl font-bold'>Your recent design</div>
                    <div className='pr-8 w-full text-right underline text-[#0000EE] font-bold'><a href=''>See all</a>
                    </div>
                    <div className='pl-8 pr-8'><HomePageCarousel></HomePageCarousel></div>
                </div>
                <div className=''>
                    <div className='text-2xl font-bold'>Example</div>
                    <div className='pr-8 w-full text-right underline text-[#0000EE] font-bold'><a href=''>See all</a></div>
                    <div className='pl-8 pr-8'><HomePageCarousel></HomePageCarousel></div>
                </div>
            </div>
        </div>
        <hr/>
        <footer>
            <HomePageFooter></HomePageFooter>
        </footer>
    </div>)
}

export default HomePage;