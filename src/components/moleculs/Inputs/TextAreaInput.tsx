import classNames from "classnames";
import { memo } from "react";
import { UseFormRegister } from "react-hook-form";

interface TextareaProps {
  name: string;
  register: UseFormRegister<any>;
  errorText?: string;
  disabled: boolean;
  placeholder?: string,
  label?: string,
}

const TextAreaInput: React.FC<TextareaProps> = ({
  name, register, errorText, disabled, placeholder, label
}) => {
  return (
    <div className="relative flex flex-col w-full">
      <label className="text-black relative block uppercase 
          flex flex-col w-full items-start">
        {label ? label : name}

        <textarea className={classNames(`w-full h-36 px-4 py-3 border border-gray50 bg-white
          text-black hover:bg-gray-50 text-sm rounded-lg resize-none
          transition-all duration-75 focus:outline-none`, {
          'border-error bg-red-50': errorText,
        })}
        id={name}
        {...register(name)}
        maxLength={5000}
        disabled={disabled}
        placeholder={placeholder}
        />
        {errorText && <p className="text-error">{errorText}</p>}
      </label>
    </div>
  );
};

export default memo(TextAreaInput);