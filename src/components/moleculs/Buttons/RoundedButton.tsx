import { memo } from "react";

interface RoundedButtonProps {
  text: string;
  classes?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
  text,
  onClick,
  classes,
  type,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`w-full flex justify-center items-center rounded-full ${classes}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default memo(RoundedButton);
