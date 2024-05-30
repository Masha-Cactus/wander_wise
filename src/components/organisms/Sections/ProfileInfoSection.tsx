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
import { memo, useEffect, useState } from "react";
import { useUser } from "@/src/store/user";
import { useGetUserSocials, useLogout } from "@/src/queries";
import { useNormalizedError } from "@/src/hooks";
import { clearCookies } from "@/src/actions/manageCookies";
import { useRouter } from "next/navigation";
import AddProfileImageModal from "../Modals/AddProfileImageModal";
import ConfirmEmailModal from "../Modals/ConfirmEmailModal";
import { Routes } from "@/src/lib/constants";

const ProfileInfoSection: React.FC = () => {
  const { user } = useUser();
  const { push } = useRouter();

  const [errorMessage, setErrorMessage] = useNormalizedError();

  const { data: userSocials } = useGetUserSocials();
  const { isPending, mutate, isError, isSuccess } = useLogout();

  const [isAddImageModal, setIsAddImageModal] = useState(false);
  const [isConfirmEmailModal, setIsConfirmEmailModal] = useState(false);

  const handleLogout = () => {
    mutate(undefined, {
      onError: (err) => setErrorMessage(err),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      clearCookies()
        .then(() => push(Routes.HOME));
    }
  }, [isSuccess]);

  return (
    <section
      className="flex flex-col gap-4 bg-white p-6 rounded-2xl
    text-black text-base font-normal text-center py-12"
    >
      <div className="relative top-0 flex justify-center">
        <Image
          src={user?.profileImage || "/user-default.png"}
          alt="profile"
          width={200}
          height={200}
          className="w-36 h-36 rounded-full object-cover"
        />

        <div
          className="absolute bg-gray80 h-8 w-8 bottom-0 right-1/3 
          flex items-center justify-center rounded-full"
        >
          <Icons.edit 
            className="text-white h-4 w-4" 
            onClick={() => setIsAddImageModal(true)} 
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <TextBase
          text={user?.pseudonym || "traveller"}
          classes="text-gray70"
          font="normal"
        />

        <Heading2 
          text={user?.firstName || user?.lastName 
            ? `${user?.firstName} ${user?.lastName}` : ''} 
          font="semibold" 
        />
        {user?.bio && <TextBase text={user.bio} font="normal" />}
      </div>

      <Divider classes="w-full h-px bg-gray20" />

      <div className="flex flex-col gap-2 text-start">
        {user?.location && (
          <div className="flex items-center gap-2">
            <Icons.location className="text-gray70 h-4 w-4" />
            <TextBase text={user.location} font="normal" />
          </div>
        )}
        <div className="flex items-center gap-2">
          <Icons.mail className="text-gray70 h-4 w-4" />
          <TextBase text={user?.email || ''} font="normal" />
        </div>
        {user?.banned && (
          <button 
            type="button" 
            onClick={() => setIsConfirmEmailModal(true)}
            className="self-start"
          >
            <ErrorText 
              errorText="Confirm your email to open full functionality"
            />
          </button>
        )}
      </div>

      <Divider classes="w-full h-px bg-gray20" />

      {(userSocials && userSocials.length > 0) && (
        <>
          <div className="flex flex-col gap-2">
            {userSocials.map((social) => (
              <a 
                key={social.id} 
                href={social.link} 
                target="_blank" 
                className="flex gap-2 items-center"
              >
                {social.name === 'Website' && (
                  <Icons.website className="w-6 h-6" />
                )}

                {social.name === 'Instagram' && (
                  <Icons.insta className="w-6 h-6" />
                )}

                {social.name === 'Twitter' && (
                  <Icons.twitter className="w-6 h-6" />
                )}

                <TextBase
                  text={social.name}
                  font="normal"
                  classes="text-start"
                />
              </a>
            ))}
          </div>

          <Divider classes="w-full h-px bg-gray20" />
        </>
      )}

      <Link
        href={Routes.PROFILE.EDIT}
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

      {isAddImageModal && (
        <AddProfileImageModal 
          onClose={() => setIsAddImageModal(false)}
        />
      )}
      {isConfirmEmailModal && (
        <ConfirmEmailModal
          type="Confirm"
          onClose={() => setIsConfirmEmailModal(false)}
        />
      )}
    </section>
  );
};

export default memo(ProfileInfoSection);
