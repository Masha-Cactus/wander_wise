"use client";

import { useRouter } from "next/navigation";
import { Icons } from "@/src/components/moleculs";

type Props = {};

const BackBtn: React.FC<Props> = ({}) => {
  const router = useRouter();
  const back = () => router.back();

  return (
    <div className="flex gap-2 items-center" onClick={back}>
      <Icons.left />
      <p>Back</p>
    </div>
  );
};

export default BackBtn;
