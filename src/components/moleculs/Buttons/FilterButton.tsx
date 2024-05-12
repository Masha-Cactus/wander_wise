import { Control, FieldPath, FieldValues } from "react-hook-form";
import InputControllerWrapper from "../Inputs/InputControllerWrapper";

interface FilterButtonProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  value: string;
}

const FilterButton = <T extends FieldValues>({
  value,
  name,
  control,
}: FilterButtonProps<T>) => {

  return (
    <InputControllerWrapper
      control={control}
      name={name}
      isLabelVisible={false}
    >
      {( field ) => (
        <button
          {...field}
          value={value}
          onClick={() => {
            field.onChange(
              field.value.includes(value)
                ? field.value.filter((v: string) => v !== value)
                : [...field.value, value]
            );
          }}
          className={`text-sm rounded-full py-2 px-3 w-max text-regular 
            text-sm ${ field.value.includes(value) ? "bg-gray80 text-white" : "bg-gray10"}`}
        >
          {value}
        </button>
      )}
    </InputControllerWrapper>
  );
};

export default FilterButton;
