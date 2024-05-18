/* eslint-disable max-len */
"use client";

import { useUser } from "@/src/store/user";
import Image from "next/image";
import Link from "next/link";
import { Divider } from "@/src/components/atoms";
import { memo, useState } from "react";
import {
  ConfirmEmailModal,
  RestorePasswordModal,
  SignInModal,
  SignUpModal,
} from "@/src/components/organisms";

const Header: React.FC = () => {
  const { user } = useUser();
  const [isShowSignInModal, setIsShowSignInModal] = useState(false);
  const [isShowSignUpModal, setIsShowSignUpModal] = useState(false);
  const [isShowConfirmEmailModal, setIsShowConfirmEmailModal] = useState(false);
  const [isShowRestorePasswordModal, setIsShowRestorePasswordModal] = useState(false);

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
      {user ? (
        <div className="flex gap-8 h-10">
          <div className="flex gap-8 text-black justify-center items-center">
            <Link href="/trips" className="">
              Trips
            </Link>

            <Link href="/saved" className="">
              Saved
            </Link>

            <Link href="/my-cards" className="">
              My cards
            </Link>
          </div>

          <Divider classes="h-full w-px bg-gray30" />
          
          <Link href="/profile">
            <Image
              src={user?.profileImage || "/user.png"}
              alt="user avatar"
              width={100}
              height={100}
              className="rounded-full w-12 h-12 bg-gray30 "
            />
          </Link>
        </div>
      ) : (
        <div className="flex gap-8">
          <button
            className="text-black flex justify-center items-center"
            onClick={() => setIsShowSignInModal(true)}
          >
            Login
          </button>
          <button
            className="w-36 h-14 bg-black text-white flex 
            justify-center items-center rounded-full"
            onClick={() => setIsShowSignUpModal(true)}
          >
            Sign Up
          </button>
        </div>
      )}

      {isShowSignInModal && (
        <SignInModal
          onClose={() => setIsShowSignInModal(false)}
          onOpenSignUp={() => setIsShowSignUpModal(true)}
          onOpenRestorePassword={() => setIsShowRestorePasswordModal(true)}
        />
      )}

      {isShowSignUpModal && (
        <SignUpModal
          onClose={() => setIsShowSignUpModal(false)}
          onOpenSignIn={() => setIsShowSignInModal(true)}
          onOpenConfirmEmail={() => setIsShowConfirmEmailModal(true)}
        />
      )}

      {isShowRestorePasswordModal && (
        <RestorePasswordModal 
          onClose={() => setIsShowRestorePasswordModal(false)}
          onOpenSignIn={() => setIsShowSignInModal(true)}
          onOpenSignUp={() => setIsShowSignUpModal(true)}
        />
      )}

      {isShowConfirmEmailModal && (
        <ConfirmEmailModal onClose={() => setIsShowConfirmEmailModal(false)}/>
      )}
    </div>
  );
};

export default memo(Header);
