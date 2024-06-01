"use client";

import Image from "next/image";
import { memo, useState } from "react";
import CardSlider from "../../moleculs/sliders/CardSlider";

type Props = {
  images: string[];
};

const CardImagesSection: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [displayedImages, setDisplayedImages] = useState(images);

  return (
    <div className="flex flex-col rounded-3xl gap-px overflow-hidden h-full">
      <CardSlider activeSlide={selectedImage} slides={displayedImages} />

      {images.length > 1 && (
        <div className="w-full flex gap-px h-24 overflow-x-scroll">
          {displayedImages.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt="Trip image"
              width={154}
              height={84}
              className="object-cover cursor-pointer grow"
              onClick={() => setSelectedImage(index)}
              onError={() => {
                setDisplayedImages((currImages) => currImages
                  .filter(currImage => currImage !== image)
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(CardImagesSection);
