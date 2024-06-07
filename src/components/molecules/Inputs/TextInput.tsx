import { memo } from "react";
import classNames from "classnames";
import {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";
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
        <div className="relative flex flex-col w-full">
          <input
            {...field}
            id={name}
            type={type}
            disabled={disabled}
            placeholder={placeholder ? placeholder : `Enter your ${name}`}
            className={classNames(
              `border bg-white placeholder:text-gray-50
                text-black flex h-10 w-full items-center
                justify-center text-sm shadow-sm rounded-md
                transition-colors duration-75 focus:outline-none px-3`,
              {
                "border-error": errorText,
                "border-gray-50": !errorText,
              }
            )}
          />
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(TextInput) as typeof TextInput;