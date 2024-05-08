type Props = {
  icon: React.ReactNode;
  onClick?: () => void;
  text?: string;
  classes: string;
};

const IconButton: React.FC<Props> = ({ icon, onClick, text, classes }) => {
  return (
    <button className={`flex gap-2 items-center ${classes}`} onClick={onClick}>
      {icon}
      {text && <p>{text}</p>}
    </button>
  );
};

export default IconButton;
