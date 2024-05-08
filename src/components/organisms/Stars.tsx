// 'use client';

// import { useState } from "react";

type Props = {
  stars: number[];
  onClick?: (_index: number) => void;
};

const Stars: React.FC<Props> = ({ stars, onClick }) => {
  // const starsArray = new Array(5).fill(0);

  // starsArray.fill(1, 0, filledStars);

  // const [stars, setStars] = useState(starsArray);

  // if (starsArray.length < 5) {
  //   for (let i = starsArray.length; i < 5; i++) {
  //     starsArray.push(0);
  //   }
  // }

  // const handleClick = (index: number) => {
  //   setStars(stars.map((star, i) => i < index ? 1 : 0));
  // };

  return (
    <div className='flex gap-1'>
      {stars.map((star, index) => (
        star === 1
          ? <p key={star} onClick={() => onClick?.(index)}>&#9733;</p> 
          : <p key={star} onClick={() => onClick?.(index)}>&#9734;</p>
      )) }
    </div>
  );
};

export default Stars;
