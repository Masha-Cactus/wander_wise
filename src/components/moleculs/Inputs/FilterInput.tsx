import { memo } from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  id? : string
};

const FilterInput: React.FC<Props> = ({
  onChange,
  value,
  id,
}) => {
  return (
    <input
      type="text"
      id={id}
      className="w-full rounded-md border border-gray70 
    py-4 px-3 text-base placeholder:regular rounded-40 outline-none"
      placeholder="Enter a location"
      value={value}
      onChange={(e) => onChange(e)}
    />
  );
};

export default memo(FilterInput);
