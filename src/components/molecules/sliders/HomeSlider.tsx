"use client";

import { memo, useCallback, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { IconButton } from "@/src/components/molecules";
import { Icons } from "@/src/components/atoms";
import "swiper/css";

interface HomeSliderProps {
  slides: string[];
}

const HomeSlider: React.FC<HomeSliderProps> = ({ slides }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl">
      <Swiper
        onSwiper={setSwiperRef}
        className="h-full"
        spaceBetween={50}
        slidesPerView={1}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        scrollbar={{ draggable: true }}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide} className="relative h-full w-full">
            <Image
              src={slide}
              alt="Homepage slide"
              fill
              className="rounded-3xl object-cover"
            />
          </SwiperSlide>
        ))}

        <div
          className="absolute bottom-[10%] left-16 z-20 flex gap-7"
        >
          <IconButton
            onClick={handlePrevious}
            classes="h-11 w-11 rounded-full border-white border-2 
              text-white hover:bg-white hover:text-gray-80"
            icon={<Icons.arrowLeft />}
          />
          <IconButton
            onClick={handleNext}
            classes="h-11 w-11 rounded-full border-white border-2 
              text-white hover:bg-white hover:text-gray-80"
            icon={<Icons.arrowRight />}
          />
        </div>
      </Swiper>
    </div>
  );
};

export default memo(HomeSlider);
