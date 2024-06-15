import { memo } from "react";

interface HeadingProps {
  text: string;
  classes?: string;
  font: "medium" | "normal" | "semibold";
}

const Heading4: React.FC<HeadingProps> = ({ text, classes, font }) => {
  return <h4 className={`font-${font} text-2xl text-black ${classes}`}>{text}</h4>;
};

export default memo(Heading4);
