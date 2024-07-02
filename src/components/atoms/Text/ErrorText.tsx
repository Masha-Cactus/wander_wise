interface ErrorTextProps {
  errorText: string;
  classes?: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({errorText, classes}) => {
  return <p className={`text-sm text-error ${classes}`}>{errorText}</p>;
};

export default ErrorText;