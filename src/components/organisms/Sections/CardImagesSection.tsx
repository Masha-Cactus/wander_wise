"use client";

import Image from "next/image";
import { memo, useState } from "react";
import CardSlider from "../../molecules/sliders/CardSlider";

type Props = {
  images: string[];
};

const CardImagesSection: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [displayedImages, setDisplayedImages] = useState(images);

  return (
    <div className="w-full flex flex-col rounded-3xl gap-px overflow-hidden">
      {displayedImages.length ? (
        <>
          <CardSlider activeSlide={selectedImage} slides={displayedImages} />

          {displayedImages.length > 1 && (
            <div className="w-full flex gap-px h-24 overflow-x-scroll">
              {displayedImages.map((image, index) => (
                <div key={image} className="relative h-full w-40 grow">
                  <Image
                    src={image}
                    alt="Trip image"
                    fill
                    sizes="160px"
                    className="object-cover cursor-pointer"
                    onClick={() => setSelectedImage(index)}
                    onError={() => {
                      setDisplayedImages((currImages) => currImages
                        .filter(currImage => currImage !== image)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div 
          className="bg-gray-30 w-full pb-[68%] rounded-3xl 
            flex justify-center items-center"
        >
          <Image 
            src="/trip-default.png" 
            alt="No card images"
            width={120}
            height={120}
            className="w-80 h-80"
          />
        </div>
      )}

    </div>
  );
};

export default memo(CardImagesSection);
