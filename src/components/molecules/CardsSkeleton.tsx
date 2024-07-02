import { Divider, Heading5 } from '@/src/components/atoms';

const CardsSkeleton = () => {
  const cards = new Array(3).fill(1);

  return (
    <div className="m-auto flex w-full flex-col gap-8">
      <Heading5 
        text="Generating cards for you. This might take a couple of minutes..." 
        font="medium"
        classes="text-gray-80 text-center"
      />

      <div 
        className="col-span-3 col-start-2 row-start-2 grid w-full 
        grid-cols-[repeat(auto-fill,325px)] justify-center gap-x-5 gap-y-6"
      >
        {cards.map((card, i) => (
          <article
            key={i}
            className="flex flex-col items-center gap-4 
            rounded-3xl bg-white p-4"
          >
            <div 
              className="w-full animate-pulse rounded-3xl bg-gray-30 pb-[68%]"
            />

            <Divider />

            <div className="h-7 w-full animate-pulse rounded-2xl bg-gray-30" />
            <div className="h-6 w-full animate-pulse rounded-2xl bg-gray-30" />
            <div className="h-14 w-full animate-pulse rounded-2xl bg-gray-30" />
          </article>
        ))}
      </div>
    </div>
  );
};

export default CardsSkeleton;