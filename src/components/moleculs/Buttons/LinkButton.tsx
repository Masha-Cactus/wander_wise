import Link from "next/link";
import { memo } from "react";

interface LinkBtnProps {
  path: string;
  text: string;
  classes?: string;
}

const LinkButton: React.FC<LinkBtnProps> = ({
  path,
  text,
  classes,
}) => {
  return (
    <button className={`w-full flex justify-center items-center ${classes}`}>
      <Link href={path}>{text}</Link>
    </button>
  );
};

export default memo(LinkButton);
