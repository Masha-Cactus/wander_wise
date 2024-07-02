import Link from "next/link";
import { Heading5, TextBase } from "@/src/components/atoms";

interface LinkButtonProps {
  path: string;
  text: string;
  classes?: string;
  textSize?: 'standard' | 'small';
}

const LinkButton: React.FC<LinkButtonProps> = ({
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

export default LinkButton;
