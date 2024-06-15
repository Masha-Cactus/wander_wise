import { memo } from "react";

interface TextProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal";
}

const TextSmall: React.FC<TextProps> = ({ text, classes, font }) => {
  return <p className={`font-${font} text-xs text-black ${classes}`}>{text}</p>;
};

export default memo(TextSmall);