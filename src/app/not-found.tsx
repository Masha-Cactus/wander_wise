import Link from 'next/link';
import { TextBase } from '@/src/components/atoms';
import { PrimaryButton } from '@/src/components/moleculs';
import { Routes } from '../lib/constants';
 
export default function NotFound() {
  return (
    <div className='m-auto flex flex-col gap-6 
      justify-center items-center text-center'>
      <h1 className='text-7xl text-gray80'>
        Page not found 😢
      </h1>
      <TextBase
        text="The page you are looking for might have been removed, 
          had its name changed or is temporarily unavalialbe." 
        font="normal"
        classes="mb-2"
      />

      <Link href={Routes.TRIPS}>
        <PrimaryButton text="Go to main page" />
      </Link>
    </div>
  );
}