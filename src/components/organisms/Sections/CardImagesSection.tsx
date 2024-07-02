"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { CardSlider } from "@/src/components/molecules";

interface CardImagesSectionProps {
  images: string[];
}

const CardImagesSection: React.FC<CardImagesSectionProps> 
= ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [displayedImages, setDisplayedImages] = useState(images);
  const handleImageError = (image: string) => {
    setDisplayedImages((currImages) => currImages
      .filter(currImage => currImage !== image)
    );
  };

  return (
    <section 
      className="flex w-full flex-col gap-px overflow-hidden rounded-3xl"
    >
      {displayedImages.length ? (
        <>
          <CardSlider activeSlide={selectedImage} slides={displayedImages} />

          {displayedImages.length > 1 && (
            <div 
              className="flex h-24 w-full justify-center 
              gap-px overflow-x-scroll"
            >
              {displayedImages.map((image, index) => (
                <div key={image} className="relative h-full w-40 grow">
                  <Image
                    src={image}
                    alt="Trip image"
                    fill
                    sizes="160px"
                    className="cursor-pointer object-cover"
                    onClick={() => setSelectedImage(index)}
                    onError={() => handleImageError(image)}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div 
          className="relative flex w-full items-center 
            justify-center rounded-3xl bg-gray-30 py-[14%]"
        >
          <Image 
            src="/trip-default.webp" 
            alt="No card images"
            width={120}
            height={120}
            className="h-80 w-80"
            priority={true}
          />
        </div>
      )}
    </section>
  );
};

export default memo(CardImagesSection);
