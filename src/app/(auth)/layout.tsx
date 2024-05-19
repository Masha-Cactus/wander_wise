"use client";

import { PropsWithChildren } from "react";

// import { AuthorizedLayout } from "@/src/components/layouts";

export default function Layout({ children }: PropsWithChildren): JSX.Element {
  return (
    // <AuthorizedLayout>
    <>
      {children}
    </>
    // </AuthorizedLayout>
  );
}