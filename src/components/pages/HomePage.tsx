import { IMAGES_SLIDES } from "@/src/lib/constants";
import { PrimaryButton }from "@/src/components/moleculs";
import { Slider } from "@/src/components/organisms";
import { memo } from "react";

type Props = {};

const HomePage: React.FC<Props> = ({}) => {
  return (
    <main
      className="h-full text-white flex flex-col 
    justify-center items-center relative gap-14"
    >
      <Slider slides={IMAGES_SLIDES} />

      <div
        className="flex flex-col justify-center items-center
        gap-12 z-10 mt-24"
      >
        <h1
          className="text-3xl font-bold maven 
        text-8xl text-center font-maven"
        >
          Experience wonder with Wander Wise!
        </h1>
        <p className="text-center text-3xl inter max-w-5xl">{`Your AI buddy for thrilling journeys, powered by cutting-edge artificial intelligence technology and personalized recommendations.`}</p>
      </div>

      <PrimaryButton text="Let's start" path="/trips" classes="h-16 w-1/3" />

      <div className=""></div>
    </main>
  );
};

export default memo(HomePage);
