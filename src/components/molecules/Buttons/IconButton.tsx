import { twMerge } from "tailwind-merge";
import { TextBase, TextSmall } from "@/src/components/atoms";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: (arg: any) => void;
  text?: string;
  classes?: string;
  size?: 'small';
  disabled?: boolean;
  truncateText?: boolean;
}

const IconButton: React.FC<IconButtonProps> 
= ({ icon, onClick, text, classes, size, disabled, truncateText }) => {
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
            <TextSmall 
              text={text} 
              font="semibold" 
              classes={twMerge('text-inherit', truncateText && 'truncate')} 
            />
          ) : (
            <TextBase 
              text={text} 
              font="normal" 
              classes={twMerge('text-inherit', truncateText && 'truncate')} 
            />
          )}
        </>
      )}
    </button>
  );
};

export default IconButton;
