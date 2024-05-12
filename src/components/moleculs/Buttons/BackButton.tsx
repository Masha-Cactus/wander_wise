"use client";

import { useRouter } from "next/navigation";
import { Heading4, Icons } from "@/src/components/atoms";

type Props = {};

const BackButton: React.FC<Props> = ({}) => {
  const router = useRouter();
  const back = () => router.back();

  return (
    <div className="flex gap-2 items-center" onClick={back}>
      <Icons.left />
      <Heading4 text="Back" font="medium"/>
    </div>
  );
};

export default BackButton;
