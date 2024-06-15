import { memo } from "react";

interface HeadingProps {
  text: string;
  classes?: string;
  font: "medium" | "normal" | "semibold";
}

const Heading5: React.FC<HeadingProps> = ({ text, classes, font }) => {
  return <h5 className={`font-${font} text-xl text-black ${classes}`}>{text}</h5>;
};

export default memo(Heading5);
