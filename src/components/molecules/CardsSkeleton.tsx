import { memo } from 'react';
import { Divider, Heading5 } from '../atoms';

const CardsSkeleton = () => {
  const cards = new Array(6).fill(1);

  return (
    <>
      <Heading5 
        text="Generating cards for you. This might take a couple of minutes..." 
        font="medium"
        classes="text-gray-80 text-center"
      />

      <div className="w-full grid grid-cols-[repeat(auto-fill,300px)] 
      justify-center gap-y-6 gap-x-5 col-start-2 col-span-3 row-start-2">
        {cards.map((card, i) => (
          <article
            key={i}
            className="flex flex-col gap-4 items-center 
            rounded-3xl bg-white p-4"
          >
            <div 
              className="w-full pb-[68%] rounded-3xl bg-gray-30 animate-pulse"
            />

            <Divider />

            <div className="w-full h-7 rounded-2xl bg-gray-30 animate-pulse" />
            <div className="w-full h-6 rounded-2xl bg-gray-30 animate-pulse" />
            <div className="w-full h-14 rounded-2xl bg-gray-30 animate-pulse" />
          </article>
        ))}
      </div>

      <span/>
    </>
  );
};

export default memo(CardsSkeleton);