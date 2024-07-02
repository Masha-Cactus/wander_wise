import { twMerge } from "tailwind-merge";

interface RoundedButtonProps {
  text: string;
  classes?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style: 'light' | 'dark' | 'red';
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  text,
  onClick,
  classes,
  type,
  disabled = false,
  style,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={twMerge(
        `w-full py-4 px-8 flex justify-center items-center rounded-full 
        transition-colors text-white text-base font-semibold border-2`, 
        classes, 
        style === 'dark' && `bg-black border-black hover:bg-gray-80 hover:border-gray-80
         active:bg-gray-70 active:border-gray-70 
         disabled:bg-gray-30 disabled:border-gray-30 disabled:text-gray-70`,
        style === 'light' && `bg-white text-black border-black hover:border-gray-80 hover:text-gray-80 
        active:border-gray-70 active:text-gray-70 
        disabled:border-gray-30 disabled:text-gray-30`,
        style === 'red' && `bg-[#E41E1E] border-[#E41E1E] hover:bg-[#C61A1A] hover:border-[#C61A1A] 
        active:bg-[#A81616] active:border-[#A81616] 
        disabled:bg-[#F5B5B5] disabled:border-[#F5B5B5] disabled:text-[#E5E5E5]`,
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default RoundedButton;
