import { memo } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/molecules";
import { TextMedium } from "@/src/components/atoms";

interface RadioButtonInputProps<T extends FieldValues> {
  text: string,
  name: FieldPath<T>;
  control: Control<T>;
  value: string | number;
}

const RadioButtonInput = <T extends FieldValues>({
  text,
  value,
  name,
  control,
}: RadioButtonInputProps<T>) => {
  const handleChange = (field: ControllerRenderProps<T, Path<T>>) => {
    const isChecked = field.value === value;
    
    field.onChange(isChecked ? "" : value);
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
          className='min-w-5/12 flex items-center justify-start gap-2'
        >
          <div className="flex h-4 w-4 cursor-pointer items-center 
          justify-center rounded-full border border-gray-80">
            {(field.value === value) && (
              <div className="h-2 w-2 rounded-full bg-gray-80" />
            )}
          </div>

          <TextMedium text={text} font="normal" />
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(RadioButtonInput) as typeof RadioButtonInput;
