import { memo } from "react";

interface TextProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal" | "medium";
}

//this is for 16px
const TextBase: React.FC<TextProps> = ({
  text,
  classes,
  font,
}) => {
  return <p className={`text-base text-black font-${font} ${classes}`}>{text}</p>;
};

export default memo(TextBase);