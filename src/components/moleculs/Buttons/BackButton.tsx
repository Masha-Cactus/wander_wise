"use client";

import { usePathname, useRouter } from "next/navigation";
import { Heading5, Icons } from "@/src/components/atoms";

const getPrevPageName = (currPathname: string) => {
  if (currPathname.startsWith('/trips') 
  || currPathname.startsWith('/my-cards')) {
    return 'Back to cards';
  } else if (currPathname.startsWith('/profile')) {
    return 'Back to profile';
  } else if (currPathname.startsWith('/saved')) {
    return currPathname === '/saved/collections'
      ? 'Back to saved cards'
      : 'Back to my collections';
  } else {
    return 'Back';
  }
};

const BackButton = () => {
  const router = useRouter();
  const back = () => router.back();
  const pathname = usePathname();
  const prevPageName = getPrevPageName(pathname);

  return (
    <button className="flex gap-2 items-center cursor-pointer" onClick={back}>
      <Icons.left className="w-6 h-6" />
      <Heading5 text={prevPageName} font="semibold"/>
    </button>
  );
};

export default BackButton;
