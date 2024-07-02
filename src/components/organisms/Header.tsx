/* eslint-disable max-len */
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/src/store/user";
import {
  ConfirmEmailModal,
  RestorePasswordModal,
  SignInModal,
  SignUpModal,
} from "@/src/components/organisms";
import { Navbar, RoundedButton, UnstyledButton } from "@/src/components/molecules";
import { Routes } from "@/src/lib/constants";

const Header: React.FC = () => {
  const { user } = useUser();
  const [isShowSignInModal, setIsShowSignInModal] = useState(false);
  const [isShowSignUpModal, setIsShowSignUpModal] = useState(false);
  const [isShowConfirmEmailModal, setIsShowConfirmEmailModal] = useState(false);
  const [isShowRestorePasswordModal, setIsShowRestorePasswordModal] = useState(false);

  return (
    <header
      className="flex items-center justify-between px-10 py-7"
    >
      <Link href={Routes.HOME} className="relative h-10 w-48">
        <Image
          src="/logo.svg"
          alt="Wander Wise logo"
          fill
          sizes="192px"
          priority={true}
        />
      </Link>
      {user ? (
        <Navbar />
      ) : (
        <div className="flex items-center gap-8">
          <UnstyledButton 
            text="Login"
            onClick={() => setIsShowSignInModal(true)}
            classes="w-16"
          />
          <RoundedButton 
            text="Sign Up" 
            style="dark" 
            classes="w-36" 
            onClick={() => setIsShowSignUpModal(true)} 
          />
        </div>
      )}

      <AnimatePresence>
        {isShowSignInModal && (
          <SignInModal
            key="signInModal"
            onClose={() => setIsShowSignInModal(false)}
            onOpenSignUp={() => setIsShowSignUpModal(true)}
            onOpenRestorePassword={() => setIsShowRestorePasswordModal(true)}
          />
        )}

        {isShowSignUpModal && (
          <SignUpModal
            key="signUpModal"
            onClose={() => setIsShowSignUpModal(false)}
            onOpenSignIn={() => setIsShowSignInModal(true)}
            onOpenConfirmEmail={() => {
              setIsShowConfirmEmailModal(true);
            }}
          />
        )}

        {isShowRestorePasswordModal && (
          <RestorePasswordModal 
            key="restorePasswordModal"
            onClose={() => setIsShowRestorePasswordModal(false)}
            onOpenSignIn={() => setIsShowSignInModal(true)}
          />
        )}

        {isShowConfirmEmailModal && (
          <ConfirmEmailModal
            key="confirmEmailModal" 
            onClose={() => setIsShowConfirmEmailModal(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
