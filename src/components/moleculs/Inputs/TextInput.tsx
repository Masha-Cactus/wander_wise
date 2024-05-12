import classNames from "classnames";
import {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import InputControllerWrapper from "./InputControllerWrapper";

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
              `border border-black bg-white
                text-black hover:bg-gray-50 flex h-10 w-full items-center
                justify-center space-x-3 text-sm shadow-sm rounded-md
                transition-all duration-75 focus:outline-none px-3`,
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

export default TextInput;
