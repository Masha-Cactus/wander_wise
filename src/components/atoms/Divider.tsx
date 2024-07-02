import { twMerge } from "tailwind-merge";

interface DividerProps {
  classes?: string,
}

const Divider: React.FC<DividerProps> = ({ classes }) => {
  return (
    <div className={twMerge('bg-gray-30 w-full h-px', classes)}></div>
  );
};

export default Divider;
