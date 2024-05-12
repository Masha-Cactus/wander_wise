import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import InputControllerWrapper from "./InputControllerWrapper";

interface CheckboxInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  value: string | number;
}

const CheckboxInput = <T extends FieldValues>({
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
    >
      {(field) => (
        <div className="flex gap-2 min-w-5/12 justify-start items-center">
          <input
            type="checkbox"
            {...field}
            onChange={() => handleChange(field)}
            className="flex justify-center h-4 w-4 cursor-pointer 
            items-center border border-gray80 rounded-full"
          />

          <p className="text-sm">{value}</p>
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default CheckboxInput;
