interface Heading4Props {
  text: string;
  classes?: string;
  font: "medium" | "normal" | "semibold";
}

const Heading4: React.FC<Heading4Props> = ({ text, classes, font }) => {
  return <h4 className={`font-${font} text-2xl text-black ${classes}`}>{text}</h4>;
};

export default Heading4;
