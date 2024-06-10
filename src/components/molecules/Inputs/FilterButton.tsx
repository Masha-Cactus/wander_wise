import { 
  Control, 
  FieldPath, 
  FieldValues, 
} from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/molecules";
import { twMerge } from "tailwind-merge";

interface FilterButtonProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  value: string;
  text?: string,
}

const FilterButton = <T extends FieldValues>({
  value,
  name,
  control,
  text,
}: FilterButtonProps<T>) => {

  return (
    <InputControllerWrapper
      control={control}
      name={name}
      isLabelVisible={false}
    >
      {( field ) => (
        <button
          type="button"
          {...field}
          value={value}
          onClick={() => {
            field.onChange(
              field.value.includes(value)
                ? field.value.filter((v: string) => v !== value)
                : [...field.value, value]
            );
          }}
          className={twMerge(
            `bg-gray-10 text-sm rounded-full py-2 px-3 
            w-max transition-colors hover:bg-gray-20`,
            field.value.includes(value) && 'bg-gray-80 text-white'
          )}
        >
          {text? text : value}
        </button>
      )}
    </InputControllerWrapper>
  );
};

export default FilterButton;
