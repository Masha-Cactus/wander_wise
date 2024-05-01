"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Google from "../../shared/icons/Google";
import { PasswordRemind, SignUp, Login } from "@/app/components/organisms";

const MetaForm = () => {
  const seeachParams = useSearchParams();
  const modal = seeachParams.get("modal");

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
        </h3>

        {modal === "login" && <Login />}
        {modal === "signup" && <SignUp />}
        {modal === "remind" && <PasswordRemind />}
      </div>

      <div
        className="flex flex-col space-y-4 
          bg-gray-50 px-4 py-8 md:px-16"
      >
        <Google className="h-5 w-5" />
        <p>Sign In with Google</p>

        <Link
          href={modal === "signup" ? "/auth?modal=login" : "/auth?modal=signup"}
          className="text-center text-sm text-gray-500"
          replace
        >
          {modal === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
        </Link>

        {modal === "login" && (
          <Link
            href={"/auth?modal=remind"}
            replace
            className="text-center text-sm text-gray-500"
          >
            Forgot your password?
          </Link>
        )}
      </div>
    </div>
  );
};

export default MetaForm;
