interface TextMediumProps {
  text: string;
  classes?: string;
  font: "semibold" | "normal";
}

const TextMedium: React.FC<TextMediumProps> = ({ text, classes, font }) => {
  return <p className={`font-${font} text-sm text-black ${classes}`}>{text}</p>;
};

export default TextMedium;