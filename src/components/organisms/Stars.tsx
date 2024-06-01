import { memo } from "react";
import { Icons } from "@/src/components/atoms";

type Props = {
  stars: number[];
};

const Stars: React.FC<Props> = ({ stars }) => {
  return (
    <div className='flex gap-1 h-6'>
      {stars.map((star, i) => (
        star === 1
          ? <Icons.filledStar key={i} className="w-6 h-6 text-yellow"/> 
          : <Icons.star key={i} className="w-6 h-6 text-yellow"/>
      )) }
    </div>
  );
};

export default memo(Stars);
