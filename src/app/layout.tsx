import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Maven_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/organisms";
import { QueryProvider } from "../providers/QueryProvider";
import { AuthProvider } from "../providers/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

const maven = Maven_Pro({ 
  subsets: ["latin"],
  variable: "--font-maven",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Wander Wise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${maven.variable} ${inter.variable}`}>
      <body className={`bg-white bg-no-repeat text-black flex flex-col font-inter h-screen`}>
        <QueryProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
