import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { Login } from "./components/Login";
// import Modal from "./components/Modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wander Wise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <Modal><Login/></Modal> */}
      </body>
    </html>
  );
}
