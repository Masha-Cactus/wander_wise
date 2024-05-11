import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = {
  text: string;
  classes?: string;
  path?: string;
  onClick?: () => void;
};

const PrimaryButton: React.FC<Props> = ({ text, classes, path, onClick }) => {
  return (
    <>
      {onClick && (
        <button
          className={twMerge(
            "w-full h-14 bg-yellow rounded-full flex",
            "justify-center items-center font-bold",
            "transition-all duration-75 text-black",
            "hover:bg-primary_btn-hover active:bg-primary_btn-active",
            "disabled:bg-primary_btn-disabled",
            classes && classes
          )}
        >
          {text}
        </button>
      )}

      {path && (
        <Link
          href={path}
          className={twMerge(
            "w-full h-14 bg-yellow rounded-full flex",
            "justify-center items-center font-bold",
            "transition-all duration-75 text-black",
            "hover:bg-primary_btn-hover active:bg-primary_btn-active",
            "disabled:bg-primary_btn-disabled",
            classes && classes
          )}
        >
          {text}
        </Link>
      )}
    </>
  );
};

export default PrimaryButton;
