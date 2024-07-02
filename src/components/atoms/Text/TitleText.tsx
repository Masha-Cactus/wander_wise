interface TitleTextProps {
  text: string;
}

const TitleText: React.FC<TitleTextProps> = ({ text }) => {
  return <p className="text-center font-maven text-8xl font-bold">{text}</p>;
};

export default TitleText;