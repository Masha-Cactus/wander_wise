import { memo } from "react";

interface HeadingProps {
  text: string;
  classes?: string;
  font: "medium" | "normal" | "semibold";
}

//this is for 24px
const Heading4: React.FC<HeadingProps> = ({ text, classes, font }) => {
  return <h4 className={`text-2xl text-black font-${font} ${classes}`}>{text}</h4>;
};

export default memo(Heading4);
