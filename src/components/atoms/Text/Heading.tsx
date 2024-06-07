import { memo } from "react";

interface HeadingProps {
  text: string;
  classes?: string;
  font: "medium" | "normal";
}

//this is for 40px
const Heading: React.FC<HeadingProps> = ({ text, classes, font}) => {
  return <h1 className={`text-5xl text-black font-${font} ${classes}`}>{text}</h1>;
};

export default memo(Heading);
