import { memo } from "react";

interface TextProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal";
}

//this is for 14px
const TextMedium: React.FC<TextProps> = ({
  text,
  classes,
  font,
}) => {
  return <p className={`text-sm text-black font-${font} ${classes}`}>{text}</p>;
};

export default memo(TextMedium);