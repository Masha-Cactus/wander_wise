"use client";

import Image from "next/image";
import { memo, useState } from "react";

type Props = {
  images: string[];
};

const ImagesBlock: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="flex flex-col rounded-2xl gap-px overflow-hidden h-full">
      <Image
        src={selectedImage}
        alt="Trip image"
        width={1000}
        height={1000}
        className="w-full h-full object-contain"
      />
      {images.length > 1 && (
        <div className="flex gap-px">
          {images.map((image) => (
            <Image
              key={image}
              src={image}
              alt="Trip image"
              width={100}
              height={100}
              className="w-full h-full"
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(ImagesBlock);
