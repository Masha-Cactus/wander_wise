import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { TextBase, TextSmall } from "@/src/components/atoms";

type Props = {
  icon: React.ReactNode;
  onClick?: (arg: any) => void;
  text?: string;
  classes: string;
  size?: 'small',
  disabled?: boolean,
};

const IconButton: React.FC<Props> 
= ({ icon, onClick, text, classes, size, disabled }) => {
  return (
    <button 
      className={twMerge(
        `flex items-center justify-center gap-1 
        px-2 py-1 cursor-pointer hover:scale-105`, 
        classes
      )}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {icon}
      {text && (
        <>
          {size === 'small' ? (
            <TextSmall text={text} font="semibold" classes="text-inherit" />
          ) : (
            <TextBase text={text} font="normal" classes="text-inherit" />
          )}
        </>
      )}
    </button>
  );
};

export default memo(IconButton);
