import { memo } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  classes?: string,
};

const Divider: React.FC<Props> = ({ classes }) => {
  return (
    <div className={twMerge('bg-gray-30 w-full h-px', classes)}></div>
  );
};

export default memo(Divider);
