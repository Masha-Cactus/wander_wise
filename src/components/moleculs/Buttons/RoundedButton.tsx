/* eslint-disable max-len */
import classNames from "classnames";
import { memo } from "react";

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
      className={classNames(
        `w-full flex justify-center items-center rounded-full border-2 border-black transition-colors ${classes}`, 
        {
          'bg-black text-white hover:bg-gray80 hover:border-gray80 active:bg-gray70 active:border-gray70 disabled:bg-gray30 disabled:border-gray30 disabled:text-gray70': 
          style === 'dark',
          'bg-white text-black hover:border-gray80 hover:text-gray80 active:border-gray70 active:text-gray70 disabled:border-gray30 disabled:text-gray30': 
          style === 'light',
          'text-white bg-[#E41E1E] border-[#E41E1E] hover:bg-[#C61A1A] hover:border-[#C61A1A] active:bg-[#A81616] active:border-[#A81616] disabled:bg-[#F5B5B5] disabled:border-[#F5B5B5] disabled:text-[#E5E5E5]': 
          style === 'red',
        })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default memo(RoundedButton);
