type Props = {
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
};

const FilterButton: React.FC<Props> = ({ value, selected, onClick }) => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    e.preventDefault();

    onClick(value);
  };

  return (
    <button
      value={value}
      onClick={(e) => handleClick(e, value)}
      className={`text-sm rounded-full py-2 px-3 w-max text-regular 
      text-sm ${selected ? "bg-gray80 text-white" : "bg-gray10"}`}
    >
      {value}
    </button>
  );
};

export default FilterButton;
