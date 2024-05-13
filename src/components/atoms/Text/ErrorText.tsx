import { memo } from "react";

interface ErrorTextProps {
  errorText: string;
  classes?: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({errorText, classes}) => {
  return <p className={`text-error text-sm ${classes}`}>{errorText}</p>;
};

export default memo(ErrorText);