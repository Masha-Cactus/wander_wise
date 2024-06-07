/* eslint-disable max-len */
"use client";

import { Routes, SLIDER_IMAGES } from "@/src/lib/constants";
import { PrimaryButton, HomeSlider } from "@/src/components/molecules";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { Heading2, TitleText } from "@/src/components/atoms";

type Props = {};

const HomePage: React.FC<Props> = ({}) => {
  const { push } = useRouter();

  return (
    <main
      className="px-10 pb-16 text-white grow flex flex-col 
    justify-center items-center relative"
    >
      <HomeSlider slides={SLIDER_IMAGES} />

      <div
        className="flex flex-col justify-center items-center
        gap-12 z-10 absolute inset-x-28 top-24"
      >
        <TitleText text="Experience wonder with Wander Wise!" />

        <Heading2
          font="normal"
          classes="text-center text-gray-5 text-[2rem] leading-[3rem]"
          text="Your AI-powered travel buddy, adept at meticulously designing personalized journeys perfectly aligned with your unique preferences and desires."
        />

        <PrimaryButton
          text="Let's start"
          type="button"
          classes="h-24 w-1/3 text-2xl"
          onClick={() => push(Routes.TRIPS)}
        />
      </div>
    </main>
  );
};

export default memo(HomePage);
