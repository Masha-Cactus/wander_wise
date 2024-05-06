"use client";

import { useUser } from "@/app/store/user";
import Image from "next/image";
import Link from "next/link";
import { Divider } from "@/app/components/atoms";

const Header: React.FC = () => {
  const { user } = useUser();

  const isAuthorized = true;

  return (
    <div
      className="flex items-center justify-between 
    mx-10 my-7"
    >
      <Link href="/" className="text-3xl font-bold text-red-800">
        <Image
          src="/logo.svg"
          alt="logo"
          width={200}
          height={200}
          className=""
        />
      </Link>
      {isAuthorized ? (
        <div className="flex gap-8 h-10">
          <div className="flex gap-8 text-black justify-center items-center">
            <Link href="/profile" className="">
              Profile
            </Link>

            <Link href="/saved" className="">
              Saved
            </Link>

            <Link href="/trips" className="">
              My cards
            </Link>
          </div>

          <Divider classes="h-full w-px bg-gray30" />

          <Image
            src={user?.profileImage || "/user.png"}
            alt="user avatar"
            width={100}
            height={100}
            className="rounded-full w-12 h-12 bg-gray30 "
          />
        </div>
      ) : (
        <div className="flex gap-8">
          <Link
            href="/auth?modal=login"
            className="text-black flex justify-center items-center"
          >
            Login
          </Link>
          <Link
            href="/auth?modal=signup"
            className="w-36 h-14 bg-black text-white flex 
            justify-center items-center rounded-full"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
