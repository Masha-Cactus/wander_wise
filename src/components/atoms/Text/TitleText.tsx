import { memo } from "react";

interface TextProps {
  text: string;
}

const TitleText: React.FC<TextProps> = ({
  text,
}) => {
  return <p className={`font-bold 
  text-8xl text-center font-maven`}>{text}</p>;
};

export default memo(TitleText);