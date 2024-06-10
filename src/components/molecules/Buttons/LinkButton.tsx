import Link from "next/link";
import { memo } from "react";
import { Heading5, TextBase } from "@/src/components/atoms";

interface LinkBtnProps {
  path: string;
  text: string;
  classes?: string;
  textSize?: 'standard' | 'small';
}

const LinkButton: React.FC<LinkBtnProps> = ({
  path,
  text,
  classes,
  textSize = 'standard',
}) => {
  return (
    <Link href={path}>
      {textSize === 'standard' ? (
        <Heading5
          text={text} 
          font="semibold" 
          classes={"underline underline-offset-8 hover:text-gray-50" + classes}
        />
      ) : (
        <TextBase
          text={text} 
          font="semibold" 
          classes={"underline underline-offset-8 hover:text-gray-50" + classes}
        />
      )}
      
    </Link>
  );
};

export default memo(LinkButton);
