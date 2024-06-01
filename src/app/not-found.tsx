import Link from 'next/link';
import { TextBase } from '@/src/components/atoms';
import { PrimaryButton } from '@/src/components/moleculs';
import { Routes } from '../lib/constants';
 
export default function NotFound() {
  return (
    <div className='w-full h-full flex flex-col gap-6 
      justify-center items-center text-center bg-gray10'>
      <h1 className='text-7xl text-gray80'>
        Page not found 😢
      </h1>
      <TextBase
        text="The page you are looking for might have been removed, 
          had its name changed or is temporarily unavailable." 
        font="normal"
        classes="mb-2 w-1/2"
      />

      <Link href={Routes.TRIPS} className="w-1/2">
        <PrimaryButton text="Go to main page" />
      </Link>
    </div>
  );
}