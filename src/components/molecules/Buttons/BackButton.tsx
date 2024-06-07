"use client";

import { usePathname, useRouter } from "next/navigation";
import { Heading5, Icons } from "@/src/components/atoms";
import { Routes } from "@/src/lib/constants";
import { useMemo } from "react";

const getPrevPage = (currPathname: string) => {
  let name = 'Back';
  let link = '';

  switch (true) {
    case currPathname.startsWith('/trips'):
      name = 'Back to cards';
      link = Routes.TRIPS;
      break;
    case currPathname.startsWith('/my-cards'):
      name = 'Back to cards';
      link = Routes.MY_CARDS.MAIN;
      break;
    case currPathname.startsWith('/profile'):
      name = 'Back to profile';
      link = Routes.PROFILE.MAIN;
      break; 
    case currPathname.startsWith('/saved'):
      const isInCollections = currPathname === '/saved/collections';

      name = isInCollections ? 'Back to saved cards' : 'Back to my collections';
      link = isInCollections ? Routes.SAVED : Routes.COLLECTIONS.MAIN;
      break;
    
    default:
      break;
  } 

  return { name, link };
};

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const prevPage = useMemo(() => getPrevPage(pathname), [pathname]);

  return (
    <button 
      className="flex gap-2 items-center cursor-pointer w-fit" 
      onClick={() => prevPage.link ? router.push(prevPage.link) : router.back()}
    >
      <Icons.left className="w-6 h-6" />
      <Heading5 text={prevPage.name} font="semibold"/>
    </button>
  );
};

export default BackButton;
