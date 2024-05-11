import { memo } from "react";

interface HeadingProps {
  text: string;
  classes?: string;
}

const Heading: React.FC<HeadingProps> = ({ text, classes }) => {
  return <h1 className={`text-4xl font-semibold ${classes}`}>{text}</h1>;
};

export default memo(Heading);
