import Link from "next/link";
import { memo } from "react";
import { Heading5 } from "@/src/components/atoms";

interface LinkBtnProps {
  path: string;
  text: string;
  classes?: string;
}

const LinkButton: React.FC<LinkBtnProps> = ({
  path,
  text,
  classes,
}) => {
  return (
    <Link href={path}>
      <Heading5
        text={text} 
        font="semibold" 
        classes={"underline underline-offset-8" + classes}
      />
    </Link>
  );
};

export default memo(LinkButton);
