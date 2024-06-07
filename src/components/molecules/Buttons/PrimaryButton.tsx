import { memo } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  text: string;
  classes?: string;
  path?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const PrimaryButton: React.FC<Props> = ({
  text,
  classes,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "w-full h-14 bg-yellow rounded-full flex",
        "justify-center items-center font-bold",
        "transition-all duration-75 text-black",
        "hover:bg-[#E79200]", 
        "active:bg-[#E47A00]",
        "disabled:bg-gray-30 disabled:text-gray-70",
        classes && classes
      )}
    >
      {text}
    </button>
  );
};

export default memo(PrimaryButton);