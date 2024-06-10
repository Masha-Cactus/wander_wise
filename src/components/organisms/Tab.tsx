"use client";

import { memo, useState } from "react";
import { Divider, TextBase, Heading5 } from "@/src/components/atoms";
import { twMerge } from "tailwind-merge";
import { Map } from "@/src/components/molecules";
import { ICardTabs } from "@/src/services";

type Props = {
  tabs: ICardTabs;
  location: 'Page' | 'Card',
};

const Tab: React.FC<Props> = ({ tabs, location }) => {
  const [active, setActive] 
  = useState<keyof ICardTabs>('Description');
  const displayedReasons = location === 'Card'
    ? tabs['Why this place?'].slice(0, 3)
    : tabs['Why this place?'];

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex justify-between">
        {Object.keys(tabs).map((tab) => (
          <li
            className={twMerge(
              "flex gap-2 rounded-lg relative",
              location === 'Page' && 'p-2',
              active === tab 
              && `after:bg-gray-800 after:h-1 after:w-full after:absolute 
              after:rounded-full after:inset-x-0 after:-bottom-2`,
            )}
            key={tab}
          >
            <button onClick={() => setActive(tab as keyof ICardTabs)}>
              {location === 'Page' ? (
                <Heading5 
                  text={tab} 
                  font={active === tab ? 'semibold' : 'normal'} 
                />
              ) : (
                <TextBase
                  text={tab} 
                  font={active === tab ? 'semibold' : 'normal'}  
                />
              )}
              
            </button>
          </li>
        ))}
      </div>

      <Divider classes="mb-1" />

      <div className={twMerge(location === 'Card' && 'line-clamp-4')}>
        {active === 'Description' && (
          <TextBase 
            text={tabs['Description']} 
            font="normal" 
          />
        )}

        {active === 'Why this place?' && (
          <ul className="w-full flex flex-col gap-2">
            {displayedReasons.map(reason => (
              <li key={reason} className="flex gap-3 w-full items-center">
                <div className="w-2 h-2 bg-gray-80 rounded-full" />
                <TextBase text={reason} font="normal" />
              </li>
            ))}
          </ul>
        )}

        {tabs["Map"] && active === 'Map' && (
          <Map coordinates={tabs['Map']} />
        )}

        {tabs["Distance"] && active === 'Distance' && (
          <div className="flex flex-col gap-2">
            {!!tabs["Distance"].value && (
              <TextBase 
                text={`This place is ${tabs["Distance"].value} km from you.`} 
                font="normal" 
              />
            )}
            <a 
              href={tabs["Distance"].mapsLink} 
              target="_blank" 
              className="text-base font-semibold text-black"
            >
              Check it out at Google Maps!
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Tab);
