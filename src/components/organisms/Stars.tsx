import { memo } from "react";
import { Icons } from "@/src/components/atoms";

type Props = {
  stars: number[];
};

const Stars: React.FC<Props> = ({ stars }) => {
  return (
    <div className='flex gap-0.5 h-6'>
      {stars.map((star) => (
        star === 1
          ? <Icons.filledStar key={star} className="w-12 h-full text-yellow"/> 
          : <Icons.star key={star} className="w-12 h-full text-yellow"/>
      )) }
    </div>
  );
};

export default memo(Stars);
