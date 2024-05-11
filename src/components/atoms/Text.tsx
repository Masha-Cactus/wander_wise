import { memo } from "react";

interface TextProps {
  text: string;
  classes?: string;
}

const Text: React.FC<TextProps> = ({
  text,
  classes,
}) => {
  return <p className={`text-base font-regular text-black ${classes}`}>{text}</p>;
};

export default memo(Text);