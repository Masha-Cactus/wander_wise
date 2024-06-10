import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Divider, Heading5 } from '@/src/components/atoms';
import { usePathname } from 'next/navigation';
import { useUser } from '@/src/store/user';
import { Routes } from '@/src/lib/constants';

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="flex gap-8 items-center h-12">
      <div className="flex gap-8 text-black justify-center items-center">
        <Link href={Routes.TRIPS}>
          <Heading5 
            text="Trips" 
            font={pathname.startsWith('/trips') ? 'semibold' : 'normal'}
            classes="hover:text-gray-70"
          />
        </Link>

        <Link href={Routes.SAVED}>
          <Heading5 
            text="Saved" 
            font={pathname.startsWith('/saved') ? 'semibold' : 'normal'}
            classes="hover:text-gray-70"
          />
        </Link>

        <Link href={Routes.MY_CARDS.MAIN}>
          <Heading5 
            text="My cards" 
            font={pathname.startsWith('/my-cards') ? 'semibold' : 'normal'}
            classes="hover:text-gray-70"
          />
        </Link>
      </div>

      <Divider classes="h-full w-px" />
          
      <Link href={Routes.PROFILE.MAIN} className="relative w-12 h-12">
        <Image
          src={user?.profileImage || "/user-default.png"}
          alt="user avatar"
          fill
          sizes="48px"
          className="rounded-full object-cover"
        />
      </Link>
    </nav>
  );
};

export default memo(Navbar);