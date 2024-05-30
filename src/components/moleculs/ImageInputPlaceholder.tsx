"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { Heading5, Icons, TextBase } from "@/src/components/atoms";

type Props = {
  image?: File,
};

const ImageInputPlaceholder: React.FC<Props> = ({ image }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);

      setImageUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  return (
    <>
      {image ? (
        <Image 
          src={imageUrl} 
          alt="Uploaded image"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover cursor-pointer" 
        />
      ) : (
        <div className="border border-black border-dashed bg-white
       text-black hover:bg-gray-50 w-full h-full cursor-pointer
        transition-all duration-75 focus:outline-none rounded-xl
        flex flex-col gap-3 items-center justify-center"
        >
          <Icons.download className="w-6 h-6" />
          <Heading5 
            text="Upload a cover photo or video" 
            font="semibold" 
          />
          <TextBase text="JPG, JPEG, PNG" font="normal" />
          <TextBase text="Choose file" font="normal" />
        </div>
      )}
    </>
  );
};

export default memo(ImageInputPlaceholder);