"use client";

import { useRouter } from "next/navigation";
import { Heading4, Icons } from "@/src/components/atoms";

type Props = {};

const BackButton: React.FC<Props> = ({}) => {
  const router = useRouter();
  const back = () => router.back();

  return (
    <div className="flex gap-2 items-center" onClick={back}>
      <Icons.left className="w-6 h-6" />
      <Heading4 text="Back" font="semibold"/>
    </div>
  );
};

export default BackButton;
