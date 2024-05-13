import { memo } from "react";

interface HeadingProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal";
}

//this is for 32px (but itsn not)
const Heading2: React.FC<HeadingProps> = ({ text, classes, font }) => {
  return <h2 className={(`text-3xl text-black font-${font} ${classes}`)}>{text}</h2>;
};

export default memo(Heading2);
