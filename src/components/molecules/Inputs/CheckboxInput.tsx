import { memo } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/molecules";
import { Icons, TextMedium } from "@/src/components/atoms";

interface CheckboxInputProps<T extends FieldValues> {
  text?: string,
  name: FieldPath<T>;
  control: Control<T>;
  value: string | number;
}

const CheckboxInput = <T extends FieldValues>({
  text,
  value,
  name,
  control,
}: CheckboxInputProps<T>) => {
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
      isErrorLabelVisible={false}
    >
      {(field) => (
        <div
          {...field}
          onClick={() => handleChange(field)}
          className='flex items-center gap-2'
        >
          <div className="flex h-6 w-6 cursor-pointer items-center 
          justify-center rounded border border-gray-80">
            {field.value.includes(value) && (
              <Icons.checked className="h-3 w-3 text-gray-80" />
            )}
          </div>

          {text && (
            <TextMedium text={text} font="normal" />
          )}

        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(CheckboxInput) as typeof CheckboxInput;