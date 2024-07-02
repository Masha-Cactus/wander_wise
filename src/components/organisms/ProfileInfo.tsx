'use client';

import { memo, useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Divider, 
  Heading2, 
  Icons, 
  TextBase, 
  ErrorText 
} from "@/src/components/atoms";
import { useUser } from "@/src/store/user";
import { useGetUserSocials, useLogout } from "@/src/queries";
import { useNormalizedError } from "@/src/hooks";
import { 
  AddProfileImageModal, 
  ConfirmEmailButton 
} from "@/src/components/organisms";
import { Routes } from "@/src/lib/constants";
import { IconButton, RoundedButton } from "@/src/components/molecules";

const ProfileInfo: React.FC = () => {
  const { user } = useUser();
  const { push } = useRouter();

  const [errorMessage, setErrorMessage] = useNormalizedError();

  const { data: userSocials } = useGetUserSocials();
  const { isPending, mutate } = useLogout();

  const [isAddImageModal, setIsAddImageModal] = useState(false);

  const handleLogout = useCallback(() => {
    mutate(undefined, {
      onError: (err) => setErrorMessage(err),
      onSuccess: () => push(Routes.HOME),
    });
  }, []);

  return (
    <article
      className="flex h-fit flex-col gap-6 rounded-2xl bg-white px-8
      py-12 text-center text-base font-normal text-black"
    >
      <div className="relative flex justify-center">
        <div className="relative h-36 w-36">
          <Image
            src={user?.profileImage || "/user-default.webp"}
            alt="profile"
            fill
            sizes="144px"
            className="rounded-full object-cover"
            priority={true}
          />
        </div>

        <IconButton 
          icon={<Icons.edit className="h-4 w-4 text-white" />} 
          onClick={() => setIsAddImageModal(true)}
          classes="p-2 absolute bottom-0 right-1/3 bg-gray-80 
          rounded-full border border-white"
        />
      </div>

      <div className="flex flex-col gap-1">
        <TextBase
          text={user?.pseudonym || "traveller"}
          classes="text-gray-70"
          font="normal"
        />

        <Heading2 
          text={
            user?.firstName || user?.lastName 
              ? `${user?.firstName || ''}${user?.firstName && user?.lastName ? ' ' : ''}${user?.lastName || ''}` 
              : ''
          } 
          font="medium"
          classes="mb-1"
        />

        {user?.bio && <TextBase text={user.bio} font="normal" />}
      </div>

      <Divider />

      <div className="flex flex-col gap-4 text-start">
        {user?.location && (
          <div className="flex items-center gap-2">
            <Icons.location className="h-6 w-6" />
            <TextBase 
              text={user.location} 
              font="normal" 
              classes="text-gray-80"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <Icons.mail className="h-6 w-6" />
          <TextBase 
            text={user?.email || ''} 
            font="normal" 
            classes="text-gray-80" 
          />
        </div>
        <ConfirmEmailButton />
      </div>

      <Divider />

      {(userSocials && userSocials.length > 0) && (
        <>
          <div className="flex flex-col gap-4">
            {userSocials.map((social) => (
              <a 
                key={social.id} 
                href={social.link} 
                target="_blank" 
                className="flex items-center gap-2"
              >
                {social.name === 'Website' && (
                  <Icons.website className="h-6 w-6" />
                )}

                {social.name === 'Instagram' && (
                  <Icons.insta className="h-6 w-6" />
                )}

                {social.name === 'Twitter' && (
                  <Icons.twitter className="h-6 w-6" />
                )}

                <TextBase
                  text={social.name}
                  font="normal"
                  classes="text-gray-80"
                />
              </a>
            ))}
          </div>

          <Divider />
        </>
      )}

      <div className="flex w-full flex-col gap-3">
        <Link
          href={Routes.PROFILE.EDIT}
          className="w-full"
        >
          <RoundedButton text="Edit profile" style="light" classes="p-2" />
        </Link>
        <RoundedButton 
          text="Logout" 
          style="red" 
          onClick={handleLogout} 
          disabled={isPending} 
          classes="p-2"
        />
      </div>

      {errorMessage && <ErrorText errorText={errorMessage} />}

      <AnimatePresence>
        {isAddImageModal && (
          <AddProfileImageModal
            key="addProfileImageModal"
            onClose={() => setIsAddImageModal(false)}
          />
        )}
      </AnimatePresence>
    </article>
  );
};

export default memo(ProfileInfo);
