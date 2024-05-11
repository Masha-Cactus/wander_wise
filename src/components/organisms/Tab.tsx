"use client";

import { memo, useState } from "react";
import { Divider } from "@/src/components/atoms";
import { twMerge } from "tailwind-merge";

type Props = {
  descriptions: {
    description: string;
    "why this place?": string;
    map: string;
  };
};

const Tab: React.FC<Props> = ({ descriptions }) => {
  const [active, setActive] = useState(descriptions.description);

  return (
    <div
      className="flex flex-col border-2 h-full 
    border-gray-300 round p-4 bg-white"
    >
      <div className="flex justify-between">
        {Object.entries(descriptions).map(([description, value]) => (
          <li
            className={twMerge(
              "flex gap-2 p-2 " + "rounded-lg relative",
              active === value 
              && "after:bg-gray-800 after:h-2 after:w-full after:absolute " 
              + "after:rounded-full after:inset-x-0 after:-bottom-4"
            )}
            key={description}
          >
            <button onClick={() => setActive(value)}>{description}</button>
          </li>
        ))}
      </div>
      <Divider classes="h-px w-full mt-4" />
      <p className="mt-4 max-h-[420px] overflow-scroll">{active}</p>
    </div>
  );
};

export default memo(Tab);
