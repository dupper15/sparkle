import {LuArrowLeftCircle, LuArrowRightCircle} from "react-icons/lu";
import testImage from '../../../assets/homepage-banner.png'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselItemCard from "./CarouselItemCard.jsx";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 3000}, items: 5
    }, desktop: {
        breakpoint: {max: 3000, min: 1024}, items: 3
    }, tablet: {
        breakpoint: {max: 1024, min: 464}, items: 2
    }, mobile: {
        breakpoint: {max: 464, min: 0}, items: 1
    }
};

//const names = [['frontend/src/assets/homepage-banner.png', 'test1'], ['frontend/src/assets/homepage-banner.png', 'test2']];

function HomePageCarousel() {
    return (
        <div className='w-full flex flex-row'>
            <Carousel containerClass='container w-full'
                      responsive={responsive}>
                <div>
                    <img src={testImage} alt='Test'/>
                    <span>Item 1</span>
                </div>
                <div>
                    <img src={testImage} alt='Test'/>
                    <span>Item 1</span>
                </div>
                <div>
                    <img src={testImage} alt='Test'/>
                    <span>Item 1</span>
                </div>
                <div>
                    <img src={testImage} alt='Test'/>
                    <span>Item 1</span>
                </div>
                <div>
                    <img src={testImage} alt='Test'/>
                    <span>Item 1</span>
                </div>
            </Carousel>
        </div>)
}

export default HomePageCarousel