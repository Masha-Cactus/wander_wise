"use client";

import React, { memo } from "react";

type Props = {
  children: React.ReactNode;
  onClose: (toClose: boolean) => void;
};

const ModalSkeleton: React.FC<Props> = ({ children, onClose }: Props) => {
  return (
    <div
      className="absolute inset-0 z-50 
    flex justify-center items-center scroll-none"
    >
      <button
        id="close"
        onClick={() => onClose(true)}
        className="h-full w-full backdrop-blur-sm
        bg-gray50 fixed top-0 left-0 bg-opacity-50"
        type="button"
      />
      <div
        className="w-[670px] overflow-hidden shadow-xl 
    md:rounded-2xl md:border md:border-gray-200 bg-pink backdrop-blur-none
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    flex flex-col items-center justify-center gap-3 space-y-3 
    border-b border-gray-200 bg-white px-10 py-12 text-center"
      >
        {children}
      </div>
    </div>
  );
};

export default memo(ModalSkeleton);
