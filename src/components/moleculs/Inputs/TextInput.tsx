import classNames from "classnames";
import { UseFormRegister } from "react-hook-form";

interface TextInputProps {
  type: string;
  name: string;
  register: UseFormRegister<any>;
  errorText?: string;
  disabled: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  register,
  name,
  errorText,
  disabled,
}) => {
  return (
    <div className="relative flex flex-col w-full">
      <label className="text-black relative block uppercase 
          flex flex-col w-full items-start">
        {name}
        <input
          id={name}
          type={type}
          {...register(name)}
          disabled={disabled}
          placeholder={`Enter your ${name}`}
          className={classNames(`border-b border-black bg-white
          text-black hover:bg-gray-50 flex h-10 w-full items-center
          justify-center space-x-3 text-sm shadow-sm
          transition-all duration-75 focus:outline-none`, {
            'border-red-200 bg-red-50': errorText,
          })}
        />
        {errorText && <p className="text-red-50">{errorText}</p>}
      </label>
    </div>
  );
};

export default TextInput;
