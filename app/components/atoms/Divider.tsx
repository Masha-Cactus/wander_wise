import { twMerge } from "tailwind-merge";

const Divider = ({ classes }: { classes: string }) => {
  return (
    <div className={twMerge('bg-gray-300', classes)}></div>
  );
};

export default Divider;
