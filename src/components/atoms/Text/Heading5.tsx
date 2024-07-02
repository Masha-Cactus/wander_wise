interface Heading5Props {
  text: string;
  classes?: string;
  font: "medium" | "normal" | "semibold";
}

const Heading5: React.FC<Heading5Props> = ({ text, classes, font }) => {
  return <h5 className={`font-${font} text-xl text-black ${classes}`}>{text}</h5>;
};

export default Heading5;
