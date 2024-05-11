import Link from "next/link";
import { memo } from "react";

type Props = {
  path: string;
  icon: React.ReactNode; 
  text?: string;
};

const IconLink: React.FC<Props> = ({path, icon, text }) => {
  return (
    <Link href={path}>
      {icon}
      {text}
    </Link>
  );
};

export default memo(IconLink);
