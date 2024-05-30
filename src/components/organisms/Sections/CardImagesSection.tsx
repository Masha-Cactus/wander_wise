"use client";

import Image from "next/image";
import { memo, useState } from "react";
import CardSlider from "../../moleculs/sliders/CardSlider";

type Props = {
  images: string[];
};

const CardImagesSection: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col rounded-3xl gap-px overflow-hidden h-full">
      <CardSlider activeSlide={selectedImage} slides={images} />

      {images.length > 1 && (
        <div className="w-full flex gap-px justify-between overflow-x-scroll">
          {images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt="Trip image"
              width={154}
              height={84}
              className="object-cover cursor-pointer"
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(CardImagesSection);
