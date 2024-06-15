import { memo } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { InputControllerWrapper } from "@/src/components/molecules";

interface TextareaProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  errorText?: string;
  disabled: boolean;
  placeholder?: string;
  label?: string;
}

const TextAreaInput = <T extends FieldValues>({
  name,
  control,
  errorText,
  disabled,
  placeholder,
  label,
}: TextareaProps<T>) => {
  return (
    <InputControllerWrapper
      label={label}
      control={control}
      name={name}
      isLabelVisible
      isErrorLabelVisible
    >
      {(field) => (
        <textarea
          className={twMerge(
            `w-full h-64 px-4 py-3 border border-gray-50
            text-base bg-white placeholder:text-gray-50
          text-black rounded-lg resize-none
            transition-colors focus:outline-none`,
            errorText && 'border-error',
          )}
          id={name}
          {...field}
          maxLength={5000}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    </InputControllerWrapper>
  );
};

export default memo(TextAreaInput) as typeof TextAreaInput;
