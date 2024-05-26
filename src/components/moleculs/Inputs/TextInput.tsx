import { memo } from "react";
import classNames from "classnames";
import {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/moleculs";

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
      isLabelVisible
      isErrorLabelVisible
    >
      {(field) => (
        <div className="relative flex flex-col w-full">
          <input
            {...field}
            id={name}
            type={type}
            disabled={disabled}
            placeholder={placeholder ? placeholder : `Enter your ${name}`}
            className={classNames(
              `border border-gray50 bg-white placeholder:text-gray50
                text-black flex h-10 w-full items-center
                justify-center text-sm shadow-sm rounded-md
                transition-colors duration-75 focus:outline-none px-3 
                disabled:bg-gray30 disabled:border-gray30 disabled:text-gray70`,
              {
                "border-error": errorText,
              }
            )}
          />
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(TextInput) as typeof TextInput;
