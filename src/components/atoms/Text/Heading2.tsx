import { memo } from "react";

interface HeadingProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal";
}

const Heading2: React.FC<HeadingProps> = ({ text, classes, font }) => {
  return <h2 className={(`font-${font} text-4xl text-black ${classes}`)}>{text}</h2>;
};

export default memo(Heading2);
