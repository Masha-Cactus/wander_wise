import { memo } from "react";

interface HeadingProps {
  text: string;
  classes?: string;
}

const Heading3: React.FC<HeadingProps> = ({ text, classes }) => {
  return <h3 className={`text-3xl font-semibold text-black ${classes}`}>{text}</h3>;
};

export default memo(Heading3);
