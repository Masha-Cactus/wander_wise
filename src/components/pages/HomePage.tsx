"use client";

import { IMAGES_SLIDES } from "@/src/lib/constants";
import { PrimaryButton } from "@/src/components/moleculs";
import { Slider } from "@/src/components/organisms";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { Heading3, TitleText } from "@/src/components/atoms";

type Props = {};

const HomePage: React.FC<Props> = ({}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/trips");
  };

  return (
    <main
      className="text-white flex flex-col 
    justify-center items-center relative gap-20 mx-10"
    >
      <Slider slides={IMAGES_SLIDES} />

      <div
        className="flex flex-col justify-center items-center
        gap-14 z-10 mt-24"
      >
        <TitleText text="Experience wonder with Wander Wise!" />

        <Heading3
          classes="text-center max-w-5xl text-white"
          text={`Your AI buddy for thrilling journeys, powered by cutting-edge artificial intelligence technology and personalized recommendations.`}
        />
      </div>

      <PrimaryButton
        text="Let's start"
        type="button"
        classes="h-16 w-1/3"
        onClick={handleClick}
      />
    </main>
  );
};

export default memo(HomePage);
