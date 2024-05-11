import { memo } from "react";

type Props = {
  selected: boolean;
  value: string;
  onClick: (value: string) => void;
};

const CheckboxInput: React.FC<Props> = ({
  selected,
  value,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(value)}
      className='flex gap-2 min-w-5/12 justify-start items-center'>
      <div className="flex justify-center h-4 w-4 cursor-pointer 
      items-center border border-gray80 rounded-full">
        {selected && (
          <div className="h-2 w-2 rounded-full bg-gray80" />
        )}
      </div>

      <p className="text-sm">{value}</p>
    </div>
  );
};

export default memo(CheckboxInput);
