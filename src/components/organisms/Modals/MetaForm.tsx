"use client";

import Image from "next/image";
import Google from "../../shared/icons/Google";
import { PasswordRemind, SignUp, Login } from "@/src/components/organisms";
import { Dispatch, SetStateAction } from "react";
import ConfirmEmail from "./ConfirmEmail";

type Props = {
  modal: 'login' | 'signup' | 'remind' | 'confirm',
  setShow: 
  Dispatch<SetStateAction<"login" | "signup" | "remind" | 'confirm' | null>>
};

const MetaForm: React.FC<Props> = ({ modal, setShow }) => {
  return (
    <div
      id="meta"
      className="w-full overflow-hidden shadow-xl md:max-w-md 
    md:rounded-2xl md:border md:border-gray-200 bg-pink backdrop-blur-none
    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="flex flex-col items-center justify-center space-y-3 
      border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16"
      >
        <Image
          src="/logo.svg"
          alt="Logo"
          className="h-10 w-32"
          width={20}
          height={20}
        />
        <h3 className="font-display text-2xl font-bold text-gray-900">
          {modal === "login" && "Sign In"}
          {modal === "signup" && "Sign Up"}
          {modal === "remind" && "Forgot Password"}
          {modal === "confirm" && "Confirm email"}
        </h3>

        {modal === "confirm" && (
          <p className="text-sm">
            Confirmation code has been sent to your email. 
            Please, do not close or refresh the page.
          </p>
        ) }

        {modal === "login" && <Login />}
        {modal === "signup" && <SignUp setShow={setShow} />}
        {modal === "remind" && <PasswordRemind />}
        {modal === "confirm" && <ConfirmEmail />}
      </div>

      <div
        className="flex flex-col space-y-4 
          bg-gray-50 px-4 py-8 md:px-16"
      >
        <Google className="h-5 w-5" />
        <p>Sign In with Google</p>

        {(modal === 'signup' || modal === 'confirm') ? (
          <button
            className="text-center text-sm text-gray-500"
            onClick={() => setShow('login')}
          >
                Already have an account?
          </button>
        ) : (
          <button
            className="text-center text-sm text-gray-500"
            onClick={() => setShow('signup')}
          >
            {"Don't have an account?"}
          </button> 
        )}

        {modal === "login" && setShow && (
          <button
            className="text-center text-sm text-gray-500"
            onClick={() => setShow('remind')}
          >
                Forgot your password?
          </button>
        )}
      </div>
    </div>
  );
};

export default MetaForm;
