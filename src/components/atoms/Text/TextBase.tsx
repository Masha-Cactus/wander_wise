import { memo } from "react";

interface TextProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal" | "medium";
}

const TextBase: React.FC<TextProps> = ({ text, classes, font }) => {
  return <p className={`font-${font} text-base text-black ${classes}`}>{text}</p>;
};

export default memo(TextBase);