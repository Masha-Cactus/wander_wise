/* eslint-disable max-len */
"use client";

import { useRouter } from "next/navigation";
import { Routes, SLIDER_IMAGES } from "@/src/lib/constants";
import { PrimaryButton, HomeSlider } from "@/src/components/molecules";
import { Heading2, TitleText } from "@/src/components/atoms";

const HomePage = () => {
  const { push } = useRouter();

  return (
    <section
      className="h-full w-full bg-white px-10 pb-10 text-white"
    >
      <div className="relative h-full w-full">
        <HomeSlider slides={SLIDER_IMAGES} />

        <div
          className="pointer-events-none absolute inset-x-28 top-0
          z-10 flex h-full flex-col items-center justify-center gap-12"
        >
          <TitleText text="Experience wonder with Wander Wise!" />

          <Heading2
            font="normal"
            classes="text-center text-gray-5 text-[3vh] leading-normal"
            text="Your AI-powered travel buddy, adept at meticulously designing personalized journeys perfectly aligned with your unique preferences and desires."
          />

          <PrimaryButton
            text="Let's start"
            type="button"
            classes="h-24 w-1/3 text-2xl pointer-events-auto"
            onClick={() => push(Routes.TRIPS)}
          />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
