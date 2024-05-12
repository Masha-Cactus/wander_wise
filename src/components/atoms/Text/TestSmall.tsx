import { memo } from "react";

interface TextProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal";
}

//this is for 12px
const TextSmall: React.FC<TextProps> = ({
  text,
  classes,
  font,
}) => {
  return <p className={`text-xs text-black font-${font} ${classes}`}>{text}</p>;
};

export default memo(TextSmall);