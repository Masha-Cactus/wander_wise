"use client";

import { memo } from "react";
import { ModalSkeleton } from "@/src/components/organisms";
import { PrimaryButton } from "@/src/components/molecules";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props =  {
  title: string;
  subtitle: string;
  buttonText: string;
  path: string;
};

const EmptyFallbackModal: React.FC<Props> 
= ({ title, subtitle, buttonText, path }) => {
  const router = useRouter();

  return (
    <ModalSkeleton 
      onClose={router.back}
      title={title}
      subtitle={subtitle}
    >
      <Link href={path} className="w-full">
        <PrimaryButton text={buttonText} />
      </Link>
    </ModalSkeleton>
  );
};

export default memo(EmptyFallbackModal);