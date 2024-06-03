import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/moleculs";
import { memo } from "react";
import { TextMedium } from "@/src/components/atoms";

interface CheckboxInputProps<T extends FieldValues> {
  text: string,
  name: FieldPath<T>;
  control: Control<T>;
  value: string | number;
  radio?: boolean;
}

const CheckboxInput = <T extends FieldValues>({
  text,
  value,
  name,
  control,
  radio,
}: CheckboxInputProps<T>) => {
  const handleChange = (field: ControllerRenderProps<T, Path<T>>) => {
    const isChecked = radio 
      ? field.value === value 
      : field.value.includes(value);

    if (radio) {
      field.onChange(isChecked ? "" : value); 
    } else {
      field.onChange(
        isChecked
          ? field.value.filter((v: string) => v !== value)
          : [...field.value, value]
      );
    } 
  };

  return (
    <InputControllerWrapper
      control={control}
      name={name}
      isLabelVisible={false}
      isErrorLabelVisible={false}
    >
      {(field) => (
        <div
          {...field}
          onClick={() => handleChange(field)}
          className='flex gap-2 min-w-5/12 justify-start items-center'
        >
          <div className="flex justify-center h-4 w-4 cursor-pointer 
          items-center border border-gray80 rounded-full">
            {(field.value === value || field.value.includes(value)) && (
              <div className="h-2 w-2 rounded-full bg-gray80" />
            )}
          </div>

          <TextMedium text={text} font="normal" />
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(CheckboxInput) as typeof CheckboxInput;
