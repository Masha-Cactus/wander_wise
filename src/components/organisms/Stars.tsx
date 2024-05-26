import { memo } from "react";

type Props = {
  stars: number[];
};

const Stars: React.FC<Props> = ({ stars }) => {
  return (
    <div className='flex gap-1'>
      {stars.map((star) => (
        star === 1
          ? <p key={star}>&#9733;</p> 
          : <p key={star}>&#9734;</p>
      )) }
    </div>
  );
};

export default memo(Stars);
