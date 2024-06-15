import { memo } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { InputControllerWrapper } from "@/src/components/molecules";

interface TextInputProps<T extends FieldValues> {
  type: string;
  name: FieldPath<T>;
  control: Control<T>;
  errorText?: string;
  disabled: boolean;
  placeholder?: string;
  label?: string;
}

const TextInput = <T extends FieldValues>({
  type,
  control,
  name,
  errorText,
  disabled,
  placeholder,
  label,
}: TextInputProps<T>) => {
  return (
    <InputControllerWrapper
      label={label}
      control={control}
      name={name}
      isLabelVisible={!!label}
      isErrorLabelVisible
    >
      {(field) => (
        <div className="relative flex w-full flex-col">
          <input
            {...field}
            id={name}
            type={type}
            disabled={disabled}
            placeholder={placeholder ? placeholder : `Enter your ${name}`}
            className={twMerge(
              `border border-gray-50 bg-white placeholder:text-gray-50
                text-black flex w-full items-center
                justify-center text-base rounded-md
                transition-colors focus:outline-none px-4 py-3`,
              errorText && 'border-error',
            )}
          />
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(TextInput) as typeof TextInput;
