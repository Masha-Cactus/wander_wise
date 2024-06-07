'use client';

import Image from "next/image";
import { useState } from "react";

type Props = {
  imageLinks: string[],
  alt: string,
  sizes: string,
};

const TripImage: React.FC<Props> = ({ imageLinks, alt, sizes }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTripImages, setIsTripImages] = useState(!!imageLinks.length);
  const handleImageError = () => {
    if (currentImageIndex + 1 < imageLinks.length) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setIsTripImages(false);
    }
  };

  return (
    <>
      {isTripImages ? (
        <Image
          src={imageLinks[currentImageIndex]}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover cursor-pointer"
          onError={handleImageError}
        />
      ) : (
        <div 
          className="bg-gray-30 flex justify-center 
          items-center absolute inset-0"
        >
          <Image 
            src="/trip-default.png" 
            alt="No card images"
            width={120}
            height={120}
            className="w-32 h-32"
          />
        </div>
      )}
    </>
  );
};

export default TripImage;