import { 
  Control, 
  FieldPath, 
  FieldValues, 
} from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/moleculs";

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
          className={`text-sm rounded-full py-2 px-3 w-max text-regular 
            ${field.value.includes(value) ? "bg-gray80 text-white" : "bg-gray10"}`}
        >
          {text? text : value}
        </button>
      )}
    </InputControllerWrapper>
  );
};

export default FilterButton;
