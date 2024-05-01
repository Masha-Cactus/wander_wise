import { Icons } from "@/app/components/moleculs";

type Props = {
  direction: "right" | "left";
  onClick?: () => void;
  classes: string;
};

const RoundBtn: React.FC<Props> = ({ classes, onClick, direction }) => {
  return (
    <button
      onClick={onClick}
      className={`h-11 w-11 rounded-full justify-center items-center flex
      ${classes}`}
    >
      {direction === "left" ? (
        <Icons.arrowLeft className="text-black" />
      ) : (
        <Icons.arrowRight />
      )}
    </button>
  );
};

export default RoundBtn;
