import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/templatepage-banner.png";
import banner3 from "../../assets/project-page-banner.png";

const bannerImgs = [banner1, banner2, banner3];

const SlideBanner = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className='rounded-2xl w-[1220px] h-[400px]'>
      {bannerImgs.map((item, idx) => (
        <SwiperSlide key={idx}>
          <img src={item} className='object-cover' alt={`Banner ${idx + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SlideBanner;
