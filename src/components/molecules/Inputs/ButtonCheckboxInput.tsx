import { memo } from "react";
import { 
  Control, 
  FieldPath, 
  FieldValues, 
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { InputControllerWrapper } from "@/src/components/molecules";

interface ButtonCheckboxInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  value: string;
  text?: string,
}

const ButtonCheckboxInput = <T extends FieldValues>({
  value,
  name,
  control,
  text,
}: ButtonCheckboxInputProps<T>) => {
  return (
    <InputControllerWrapper
      control={control}
      name={name}
      isLabelVisible={false}
      isErrorLabelVisible={false}
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

export default memo(ButtonCheckboxInput) as typeof ButtonCheckboxInput;
