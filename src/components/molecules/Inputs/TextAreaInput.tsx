import { memo } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { InputControllerWrapper } from "@/src/components/molecules";

interface TextAreaInputProps<T extends FieldValues> {
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
}: TextAreaInputProps<T>) => {
  return (
    <InputControllerWrapper
      label={label}
      control={control}
      name={name}
      isLabelVisible
      isErrorLabelVisible
    >
      {(field) => (
        <div className={twMerge(
          `h-64 border border-gray-50
          rounded-lg overflow-hidden
          transition-colors px-4 py-3`,
          errorText && 'border-error',
        )}>
          <textarea
            className="h-full w-full resize-none bg-white 
              text-base text-black 
              placeholder:text-gray-50 focus:outline-none"
            id={name}
            {...field}
            maxLength={4000}
            disabled={disabled}
            placeholder={placeholder}
          />
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(TextAreaInput) as typeof TextAreaInput;
