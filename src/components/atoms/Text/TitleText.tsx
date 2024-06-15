import { memo } from "react";

interface TextProps {
  text: string;
}

const TitleText: React.FC<TextProps> = ({ text }) => {
  return <p className="text-center font-maven text-8xl font-bold">{text}</p>;
};

export default memo(TitleText);