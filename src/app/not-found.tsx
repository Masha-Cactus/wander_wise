import Link from 'next/link';
import { Heading4 } from '@/src/components/atoms';
import { PrimaryButton } from '@/src/components/molecules';
import { Routes } from '@/src/lib/constants';
 
export default function NotFound() {
  return (
    <div 
      className='flex h-full w-full flex-col items-center 
      justify-center gap-6 bg-gray-10 text-center'
    >
      <h1 className='text-7xl font-semibold text-gray-80'>
        Page not found 😢
      </h1>
      <Heading4
        text="The page you are looking for might have been removed, 
          had its name changed or is temporarily unavailable." 
        font="normal"
        classes="mb-2 w-1/2 text-gray-80"
      />

      <Link href={Routes.TRIPS} className="w-[590px]">
        <PrimaryButton text="Go to main page" />
      </Link>
    </div>
  );
}