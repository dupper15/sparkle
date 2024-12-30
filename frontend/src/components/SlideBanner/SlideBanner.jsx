import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import banner3 from "../../assets/banner3.png";

const bannerImgs = [banner1, banner2, banner3];

const SlideBanner = () => {
  return (
    <div className="w-full rounded-2xl">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="rounded-2xl">
        {bannerImgs.map((item, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={item}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-conver rounded-2xl"
              alt={`Banner ${idx + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideBanner;
