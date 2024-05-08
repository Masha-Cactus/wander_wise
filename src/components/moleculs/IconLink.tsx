import Link from "next/link";

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

export default IconLink;
