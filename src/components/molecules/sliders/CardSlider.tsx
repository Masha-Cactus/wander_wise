"use client";

import { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import 'swiper/css/pagination';

interface CardSliderProps {
  slides: string[];
  activeSlide: number;
}

const CardSlider: React.FC<CardSliderProps> = ({ slides, activeSlide }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  useEffect(() => {
    swiperRef?.slideToLoop(activeSlide);
  }, [activeSlide, swiperRef]);

  return (
    <div className="relative w-full">
      <Swiper
        onSwiper={setSwiperRef}
        pagination={{
          dynamicBullets: true,
        }}
        spaceBetween={50}
        slidesPerView={1}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        scrollbar={{ draggable: true }}
        loop={slides.length > 1}
        style={{
          "--swiper-pagination-color": "#F9F9F9",
          "--swiper-pagination-bullet-inactive-color": "#C1C1C1",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "12px",
          "--swiper-pagination-bullet-horizontal-gap": "15px"
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide} className="relative h-full w-full pb-[68%]">
            <Image
              src={slide}
              alt="Trip image"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="cursor-pointer object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(CardSlider);