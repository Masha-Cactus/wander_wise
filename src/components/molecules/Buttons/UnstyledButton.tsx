import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface UnstyledButtonProps {
  text: string;
  classes?: string;
  onClick: () => void;
}

const UnstyledButton: React.FC<UnstyledButtonProps> = ({
  onClick,
  classes,
  text,
}) => {
  return (
    <button 
      className={twMerge(`text-base font-semibold text-black ${classes}`)} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default memo(UnstyledButton);
