import { UseFormRegister } from "react-hook-form";
import classNames from "classnames";
import { Icons } from "@/src/components/atoms";
import { memo } from "react";

interface PasswordInputProps {
  name: string;
  register: UseFormRegister<any>;
  errorText?: string;
  placeholder?: string;
  disabled: boolean;
  isShown: boolean;
  onClick: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  register,
  name,
  errorText,
  placeholder,
  disabled,
  isShown,
  onClick,
}) => {
  return (
    <div className="relative flex flex-col w-full">
      <label
        className="text-black relative block 
          flex flex-col w-full items-start"
      >
        {name}
        <div
          className={classNames(
            `flex w-full items-center justify-between 
            border border-black bg-white 
            text-black hover:bg-gray-50 flex h-10 w-full items-center 
            justify-center space-x-3 text-sm shadow-sm rounded-md 
            transition-all duration-75 focus:outline-none px-3`,
            {
              "border-red-200 bg-red-50": errorText,
            }
          )}
        >
          <input
            id={name}
            type={isShown ? "text" : "password"}
            {...register(name)}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none"
          />
          <button onClick={onClick}>
            {isShown ? <Icons.eyeClosed /> : <Icons.eye />}
          </button>
        </div>
        {errorText && <p className="text-red-50">{errorText}</p>}
      </label>
    </div>
  );
};

export default memo(PasswordInput);
