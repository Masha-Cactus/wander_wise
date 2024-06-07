import { memo } from "react";

interface HeadingProps {
  text: string;
  classes?: string;
}

//this is for 28px 
const Heading3: React.FC<HeadingProps> = ({ text, classes }) => {
  return <h3 className={`text-3xl text-black font-semibold ${classes}`}>{text}</h3>;
};

export default memo(Heading3);
