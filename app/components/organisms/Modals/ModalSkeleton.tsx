'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const ModalSkeleton = (
  { path, children }
  : { path: string, children: React.ReactNode }
) => {
  const router = useRouter();

  return (
    <div className='flex justify-center items-center scroll-none'>
      {path === 'back' 
        ? (<button
          onClick={() => router.back()}
          className='h-full w-full backdrop-blur-sm
            bg-gray50 fixed top-0 left-0 bg-opacity-50'
        />)
        : <Link 
          href={path}
          className='h-full w-full backdrop-blur-sm
            bg-gray-500 fixed top-0 left-0 bg-opacity-50'
        />
      }
      {children}
    </div>
  );
};

export default ModalSkeleton;
