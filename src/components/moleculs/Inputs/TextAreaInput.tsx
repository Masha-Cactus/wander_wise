import { memo } from "react";
import classNames from "classnames";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/moleculs";

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
          className={classNames(
            `w-full h-64 px-4 py-3 border bg-white
                text-black hover:bg-gray-50 text-sm rounded-lg resize-none
                transition-all duration-75 focus:outline-none`,
            {
              "border-error": errorText,
              "border-gray50": !errorText,
            }
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
