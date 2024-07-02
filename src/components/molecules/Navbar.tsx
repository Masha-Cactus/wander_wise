import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Divider, Heading5 } from '@/src/components/atoms';
import { useUser } from '@/src/store/user';
import { Routes } from '@/src/lib/constants';

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="flex h-12 items-center gap-8">
      <div className="flex items-center justify-center gap-8 text-black">
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
          
      <Link href={Routes.PROFILE.MAIN} className="relative h-12 w-12">
        <Image
          src={user?.profileImage || "/user-default.webp"}
          alt="user avatar"
          fill
          sizes="48px"
          className="rounded-full object-cover"
          priority={true}
        />
      </Link>
    </nav>
  );
};

export default Navbar;