'use client';

import Image from "next/image";
import Link from "next/link";

import { 
  Divider, 
  Heading2, 
  Icons, 
  TextBase, 
  ErrorText 
} from "@/src/components/atoms";
import { memo } from "react";
import { useUser } from "@/src/store/user";
import { useLogout } from "@/src/queries";
import { useNormalizedError } from "@/src/hooks";

const ProfileInfoSection: React.FC = () => {
  const { user } = useUser();
  const { firstName, lastName, bio, location, profileImage, pseudonym, email } 
  = user!;

  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { isPending, mutate, isError } = useLogout();

  const handleLogout = () => {
    mutate(undefined, {
      onError: (err) => setErrorMessage(err),
    });
  };

  return (
    <div
      className="flex flex-col gap-4 bg-white p-6 rounded-2xl
    text-black text-base font-normal text-center py-12"
    >
      <div className="relative top-0 flex justify-center">
        <Image
          src={
            profileImage
              ? profileImage
              : `https://images.stockcake.com/public/7/5/2/752210ff-3ce6-447b-8529-7deec989d405_large/wriggling-earthworm-closeup-stockcake.jpg`
          }
          alt="profile"
          width={200}
          height={200}
          className="rounded-full w-1/3"
        />

        <div
          className="absolute bg-gray80 h-8 w-8 bottom-0 right-1/3 
          flex items-center justify-center rounded-full"
        >
          <Icons.edit className="text-white h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <TextBase
          text={pseudonym ? pseudonym : "beautifultraveler"}
          classes="text-gray70"
          font="normal"
        />

        <Heading2 text={firstName || lastName ? `${firstName} ${lastName}` : ''} font="semibold" />
        {bio && <TextBase text={bio} font="normal" />}
      </div>

      <Divider classes="w-full h-px bg-gray20" />

      <div className="flex flex-col gap-2 text-start">
        {location && (
          <div className="flex items-center gap-2">
            <Icons.location className="text-gray70 h-4 w-4" />
            <TextBase text={location} font="normal" />
          </div>
        )}
        <div className="flex items-center gap-2">
          <Icons.mail className="text-gray70 h-4 w-4" />
          <TextBase text={email} font="normal" />
        </div>
      </div>

      <Divider classes="w-full h-px bg-gray20" />

      {/* {socials.length > 0 && (
        <>
          <div className="flex flex-col gap-2">
            {socials.map((social) => (
              <TextBase
                key={social}
                text={social}
                font="normal"
                classes="text-start"
              />
            ))}
          </div>

          <Divider classes="w-full h-px bg-gray20" />
        </>
      )} */}

      <Link
        href="/profile/edit"
        className="border border-black rounded-full p-2"
      >
        Edit profile
      </Link>
      <button 
        className="bg-error text-white rounded-full p-2"
        disabled={isPending}
        onClick={handleLogout}
      >
        Logout
      </button>
      {isError && <ErrorText errorText={errorMessage} />}
    </div>
  );
};

export default memo(ProfileInfoSection);
