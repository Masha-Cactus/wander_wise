/* eslint-disable max-len */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Maven_Pro } from "next/font/google";
import { Header } from "@/src/components/organisms";
import { QueryProvider, AuthProvider } from "@/src/providers";
import { SITE_NAME } from "@/src/lib/constants";
import "./globals.css";

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
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description:
    "Your AI-powered travel buddy, adept at meticulously designing personalized journeys perfectly aligned with your unique preferences and desires.",
  openGraph: {
    title: SITE_NAME,
    description: "Your AI-powered travel buddy",
    images: {
      url: `${process.env.NEXT_PUBLIC_CLIENT_HOST}/public/logo.svg`,
      width: 800,
      height: 600,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${maven.variable} ${inter.variable}`}>
      <body
        className={`flex h-screen flex-col bg-white bg-no-repeat font-inter text-black`}
      >
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
