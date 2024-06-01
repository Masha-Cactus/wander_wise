"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { EffectCreative } from "swiper/modules";
import { memo, useCallback, useState } from "react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

import { IconButton } from "@/src/components/moleculs";
import { Icons } from "@/src/components/atoms";

type Props = {
  slides: string[];
};

const HomeSlider: React.FC<Props> = ({ slides }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();

  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <div className="h-full w-full rounded-3xl relative">
      <Swiper
        onSwiper={setSwiperRef}
        className=""
        spaceBetween={50}
        slidesPerView={1}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectCreative]}
        scrollbar={{ draggable: true }}
        loop
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide} className="h-full w-full relative pb-[60%]">
            <Image
              src={slide}
              alt="slide"
              fill
              style={{ 
                objectFit: 'cover',
                borderRadius: '40px',
                cursor: 'pointer', 
              }}
            />
          </SwiperSlide>
        ))}

        <div
          className="product-slider__icons absolute z-20 
        bottom-20 left-16 flex gap-7"
        >
          <IconButton
            onClick={handlePrevious}
            classes="h-11 w-11 rounded-full border-white border-2 
              text-white hover:bg-white hover:text-gray80"
            icon={<Icons.arrowLeft />}
          />
          <IconButton
            onClick={handleNext}
            classes="h-11 w-11 rounded-full border-white border-2 
              text-white hover:bg-white hover:text-gray80"
            icon={<Icons.arrowRight />}
          />
        </div>
      </Swiper>
    </div>
  );
};

export default memo(HomeSlider);
