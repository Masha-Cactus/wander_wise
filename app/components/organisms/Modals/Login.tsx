"use client";

import { SignInForm } from "@/app/components/organisms";

const Login = () => {
  return (
    <div
      className=" w-full h-full
    flex items-center justify-center flex-col
    self-center
    "
    >
      <SignInForm />
    </div>
  );
};

export default Login;
