"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ModalTemplate } from "@/src/components/organisms";
import { PrimaryButton } from "@/src/components/molecules";

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
    <ModalTemplate 
      onClose={router.back}
      title={title}
      subtitle={subtitle}
    >
      <Link href={path} className="w-full">
        <PrimaryButton text={buttonText} />
      </Link>
    </ModalTemplate>
  );
};

export default memo(EmptyFallbackModal);