import HomePageHeader from "../../components/HomePageComponents/Header/HomePageHeader.jsx";
import {LuHome, LuLayoutTemplate, LuNewspaper} from "react-icons/lu";
import HomePageBanner from "../../components/HomePageComponents/Banner/HomePageBanner.jsx";
import HomePageCarousel from "../../components/HomePageComponents/Carousel/HomePageCarousel.jsx";

const HomePage = () => {
    return (<div className="w-screen h-screen flex flex-col">
        <HomePageHeader/>

        <div className='flex h-[calc(100%-60px)] w-screen'>
            <div className='w-[100px] bg-[#18191B] z-50 h-full text-white overflow-y-auto'>
                <div onClick={() => {
                }}
                     className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                    <span className='text-2xl'><LuHome/></span>
                    <span className='text-l'>Home</span>
                </div>
                <div onClick={() => {
                }}
                     className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                    <span className='text-2xl'><LuNewspaper/></span>
                    <span className='text-l'>Projects</span>
                </div>
                <div onClick={() => {
                }}
                     className="w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-[#610BEF] ">
                    <span className='text-2xl'><LuLayoutTemplate/></span>
                    <span className='text-l'>Templates</span>
                </div>

            </div>
            <div className='flex flex-col h-full ]'>
                <div className='flex items-center justify-center'>
                    <HomePageBanner></HomePageBanner>
                </div>
                <div className='w-[calc(100%-75px)]'>
                    <div className='text-2xl font-bold'>Your recent design</div>
                    <div className='w-full text-right underline text-[#0000EE] font-bold'><a href=''>See all</a></div>
                    <div><HomePageCarousel></HomePageCarousel></div>
                </div>
                <div >
                    <div className='text-2xl font-bold'>Example</div>
                    <div>See all</div>
                    <div><span>Carousel here</span></div>
                </div>

            </div>
        </div>
        <div>
            <div className='flex flex-row'>
                <div>School logo here</div>
                <div>School name here</div>
                <div>Group name here</div>
            </div>
            <hr></hr>
            <div className=' flex flex-row'>
                <div>Welcome. All rights reserved.</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Contact panel here</div>
            </div>
        </div>
    </div>)
}

export default HomePage;