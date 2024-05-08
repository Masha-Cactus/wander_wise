'use client';

import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  children: React.ReactNode,
  setShow: 
  Dispatch<SetStateAction<"login" | "signup" | "remind" | 'confirm' | null>>
};

const ModalSkeleton: React.FC<Props> = (
  { children, setShow }
) => {
  return (
    <div className='absolute inset-0 z-50 
    flex justify-center items-center scroll-none'>
      <button
        onClick={() => setShow(null)}
        className='h-full w-full backdrop-blur-sm
            bg-gray50 fixed top-0 left-0 bg-opacity-50'
      />
      {children}
    </div>
  );
};

export default ModalSkeleton;
