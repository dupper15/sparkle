import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

function Carousel({images, autoPlayInterval}) {
    Carousel.propTypes = {
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        autoPlayInterval: PropTypes.number,
    };
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, autoPlayInterval);

        return () => clearInterval(intervalId);
    }, [images, autoPlayInterval]);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="carousel-container">
            <div
                className="carousel-slides"
                ref={carouselRef}
                style={{transform: `translateX(-${currentIndex * 100}%)`}}
            >
                {images.map((image, index) => (
                    <div className="carousel-slide" key={index}>
                        <img src={image} alt={`Image ${index + 1}`}/>
                    </div>
                ))}
            </div>
            <button className="carousel-button prev" onClick={handlePrevClick}>
                &lt;
            </button>
            <button className="carousel-button next" onClick={handleNextClick}>
                &gt;
            </button>
        </div>
    );
}

export default Carousel;