import { memo } from "react";

interface TextProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal";
}

const TextMedium: React.FC<TextProps> = ({ text, classes, font }) => {
  return <p className={`font-${font} text-sm text-black ${classes}`}>{text}</p>;
};

export default memo(TextMedium);