import { twMerge } from "tailwind-merge";

interface UnstyledButtonProps {
  text: string;
  classes?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

const UnstyledButton: React.FC<UnstyledButtonProps> = ({
  onClick,
  classes,
  text,
  disabled,
  type
}) => {
  return (
    <button 
      className={twMerge(`text-base font-semibold text-black ${classes}`)} 
      onClick={onClick}
      disabled={disabled}
      type={type || "button"}
    >
      {text}
    </button>
  );
};

export default UnstyledButton;
