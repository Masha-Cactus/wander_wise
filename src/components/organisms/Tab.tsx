"use client";

import { memo, useState } from "react";
import { Divider, TextBase, Heading5 } from "@/src/components/atoms";
import { twMerge } from "tailwind-merge";
import { Map } from "@/src/components/moleculs";

type Tabs = {
  'Description': string;
  "Why this place?": string[];
  'Map': string;
};

type Props = {
  tabs: Tabs;
};

const Tab: React.FC<Props> = ({ tabs }) => {
  const [active, setActive] 
  = useState<keyof Tabs>('Description');

  return (
    <div
      className="flex flex-col border-2 h-full gap-2 
    border-gray-300 rounded-3xl p-8 bg-white"
    >
      <div className="flex justify-between">
        {Object.keys(tabs).map((tab) => (
          <li
            className={twMerge(
              "flex gap-2 p-2 " + "rounded-lg relative",
              active === tab 
              && "after:bg-gray-800 after:h-1 after:w-full after:absolute " 
              + "after:rounded-full after:inset-x-0 after:-bottom-2"
            )}
            key={tab}
          >
            <button onClick={() => setActive(tab as keyof Tabs)}>
              <Heading5 
                text={tab} 
                font={active === tab ? 'semibold' : 'normal'} 
              />
            </button>
          </li>
        ))}
      </div>

      <Divider classes="h-px w-full mb-4" />

      <div className="max-h-[420px] overflow-scroll">
        {active === 'Description' && (
          <TextBase text={tabs['Description']} font="normal" />
        )}

        {active === 'Why this place?' && (
          <ul className="w-full flex flex-col gap-2">
            <>
              {tabs['Why this place?'].map(reason => (
                <li key={reason} className="flex gap-3 w-full items-center">
                  <div className="w-2 h-2 bg-gray80 rounded-full" />
                  <TextBase text={reason} font="normal" />
                </li>
              ))}
            </>
          </ul>
        )}

        {active === 'Map' && (
          <Map mapLink={tabs['Map']} />
        )}
      </div>
    </div>
  );
};

export default memo(Tab);
