interface TextSmallProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal";
}

const TextSmall: React.FC<TextSmallProps> = ({ text, classes, font }) => {
  return <p className={`font-${font} text-xs text-black ${classes}`}>{text}</p>;
};

export default TextSmall;