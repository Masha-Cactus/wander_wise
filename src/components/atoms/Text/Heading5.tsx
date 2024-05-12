import { memo } from "react";

interface HeadingProps {
  text: string;
  classes?: string;
  font: "medium" | "normal";
}

//this is for 20px
const Heading5: React.FC<HeadingProps> = ({ text, classes, font }) => {
  return <h5 className={`text-xl text-black font-${font} ${classes}`}>{text}</h5>;
};

export default memo(Heading5);
