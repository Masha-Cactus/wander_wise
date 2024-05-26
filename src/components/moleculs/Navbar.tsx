import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Divider, Heading5 } from '@/src/components/atoms';
import { usePathname } from 'next/navigation';
import { useUser } from '@/src/store/user';

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="flex gap-8 h-10">
      <div className="flex gap-8 text-black justify-center items-center">
        <Link href="/trips">
          <Heading5 
            text="Trips" 
            font={pathname.startsWith('/trips') ? 'semibold' : 'normal'} 
          />
        </Link>

        <Link href="/saved">
          <Heading5 
            text="Saved" 
            font={pathname.startsWith('/saved') ? 'semibold' : 'normal'} 
          />
        </Link>

        <Link href="/my-cards">
          <Heading5 
            text="My cards" 
            font={pathname.startsWith('/my-cards') ? 'semibold' : 'normal'} 
          />
        </Link>
      </div>

      <Divider classes="h-full w-px bg-gray30" />
          
      <Link href="/profile">
        <Image
          src={user?.profileImage || "/user.png"}
          alt="user avatar"
          width={100}
          height={100}
          className="rounded-full w-12 h-12 bg-gray30"
        />
      </Link>
    </nav>
  );
};

export default memo(Navbar);