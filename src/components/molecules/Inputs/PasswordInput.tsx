import { memo } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import classNames from "classnames";
import { Icons } from "@/src/components/atoms";
import { InputControllerWrapper } from "@/src/components/molecules";

interface PasswordInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  errorText?: string;
  placeholder?: string;
  disabled: boolean;
  isShown: boolean;
  onClick: () => void;
}

const PasswordInput = <T extends FieldValues>({
  name,
  label,
  errorText,
  placeholder,
  disabled,
  isShown,
  onClick,
  control,
}: PasswordInputProps<T>) => {
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
          <div
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
          >
            <input
              id={name}
              type={isShown ? "text" : "password"}
              {...field}
              disabled={disabled}
              placeholder={placeholder}
              className="w-full bg-transparent outline-none"
            />

            <span onClick={onClick} className="cursor-pointer">
              {isShown ? <Icons.eyeClosed /> : <Icons.eye />}
            </span>
          </div>
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(PasswordInput) as typeof PasswordInput;
