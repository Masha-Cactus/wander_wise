import { memo } from "react";
import { TextBase } from "@/src/components/atoms";

type Props = {
  icon: React.ReactNode;
  onClick?: () => void;
  text?: string;
  classes: string;
};

const IconButton: React.FC<Props> = ({ icon, onClick, text, classes }) => {
  return (
    <button className={`flex gap-2 items-center justify-center ${classes}`} onClick={onClick}>
      {icon}
      {text && <TextBase text={text} font="normal"/>}
    </button>
  );
};

export default memo(IconButton);
