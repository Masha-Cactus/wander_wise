import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/moleculs";
import { memo } from "react";
import { Icons, TextMedium } from "@/src/components/atoms";

interface SquareCheckboxInputProps<T extends FieldValues> {
  text: string,
  name: FieldPath<T>;
  control: Control<T>;
  value: string | number;
}

const SquareCheckboxInput = <T extends FieldValues>({
  text,
  value,
  name,
  control,
}: SquareCheckboxInputProps<T>) => {
  const handleChange = (field: ControllerRenderProps<T, Path<T>>) => {
    const isChecked = field.value.includes(value);

    field.onChange(
      isChecked
        ? field.value.filter((v: string) => v !== value)
        : [...field.value, value]
    );
  };

  return (
    <InputControllerWrapper
      control={control}
      name={name}
      isLabelVisible={false}
    >
      {(field) => (
        <div
          {...field}
          onClick={() => handleChange(field)}
          className='flex gap-2 min-w-5/12 items-center'
        >
          <div className="flex justify-center h-6 w-6 cursor-pointer 
          items-center border border-gray80 rounded">
            {(field.value === value || field.value.includes(value)) && (
              <Icons.checked className="h-3 w-3 text-gray-80" />
            )}
          </div>

          <TextMedium 
            text={text} 
            font="normal" 
          />
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(SquareCheckboxInput) as typeof SquareCheckboxInput;