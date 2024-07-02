import { Icons } from "@/src/components/atoms";

interface StarsProps {
  stars: number[];
}

const Stars: React.FC<StarsProps> = ({ stars }) => {
  return (
    <div className='flex h-6 gap-1'>
      {stars.map((star, i) => (
        star === 1
          ? <Icons.filledStar key={i} className="h-6 w-6 text-yellow"/> 
          : <Icons.star key={i} className="h-6 w-6 text-yellow"/>
      )) }
    </div>
  );
};

export default Stars;
