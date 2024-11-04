import testImage from '../../../assets/homepage-banner.png'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        breakpoint: {max: 4000, min: 3000}, items: 5
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024}, items: 3
    },
    tablet: {
        breakpoint: {max: 1024, min: 464}, items: 2
    },
    mobile: {
        breakpoint: {max: 464, min: 0}, items: 1
    }
};


//const names = [['frontend/src/assets/homepage-banner.png', 'test1'], ['frontend/src/assets/homepage-banner.png', 'test2']];

function CustomCarousel() {
    return (
        <Carousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            infinite={false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            transitionDuration={500}
            // containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // dotListClass="custom-dot-list-style"
            // carousel-item-padding-40-px carousel-item-width-100-px
            itemClass="">
            <div>
                <img className='' src={testImage} alt='Test'/>
                <span>Item 1</span>
            </div>
            <div>
                <img className='' src={testImage} alt='Test'/>
                <span>Item 1</span>
            </div>
            <div>
                <img className='' src={testImage} alt='Test'/>
                <span>Item 1</span>
            </div>
            <div>
                <img className='' src={testImage} alt='Test'/>
                <span>Item 1</span>
            </div>
            <div>
                <img className='' src={testImage} alt='Test'/>
                <span>Item 1</span>
            </div>
            <div>
                <img className='' src={testImage} alt='Test'/>
                <span>Item 1</span>
            </div>
            <div>
                <img className='' src={testImage} alt='Test'/>
                <span>Item 1</span>
            </div>
            <div>
                <img className='' src={testImage} alt='Test'/>
                <span>Item 1</span>
            </div>
            <div>
                <img className='' src={testImage} alt='Test'/>
                <span>Item 1</span>
            </div>
        </Carousel>)
}

export default CustomCarousel