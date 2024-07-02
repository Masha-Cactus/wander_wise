"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { Heading5, Icons, TextBase } from "@/src/components/atoms";

interface ImageInputPlaceholderProps {
  image?: File,
}

const ImageInputPlaceholder: React.FC<ImageInputPlaceholderProps> 
= ({ image }) => {
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
          className="cursor-pointer object-cover" 
        />
      ) : (
        <div className="flex h-full w-full cursor-pointer
       flex-col items-center justify-center gap-3 rounded-xl
        border border-dashed border-black bg-white focus:outline-none"
        >
          <Icons.download className="h-6 w-6" />
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