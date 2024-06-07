"use client";

import React, { memo, useEffect } from "react";
import { createPortal } from "react-dom";
import { Heading, Heading4 } from "@/src/components/atoms";

type Props = {
  children: React.ReactNode;
  onClose: (toClose: boolean) => void;
  title?: string;
  subtitle?: string;
};

const ModalSkeleton: React.FC<Props> 
= ({ children, onClose, title, subtitle }) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  return createPortal(
    <div
      className="fixed top-0 left-0 z-50 w-full h-full
    flex justify-center items-center scroll-none"
    >
      <button
        id="close"
        onClick={() => onClose(true)}
        className="h-full w-full backdrop-blur-sm
        bg-gray-50 bg-opacity-50"
      />

      <div
        className="w-[670px] absolute shadow-xl backdrop-blur-none
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        flex flex-col items-center justify-center gap-4 rounded-3xl
        border-b border-gray-200 bg-white px-10 py-12 text-center"
      >
        {!!title && (
          <Heading text={title} font="normal"/>
        )}
        {!!subtitle && (
          <Heading4 
            text={subtitle} 
            font="medium" 
            classes="mb-2 text-gray-80"
          />
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default memo(ModalSkeleton);
