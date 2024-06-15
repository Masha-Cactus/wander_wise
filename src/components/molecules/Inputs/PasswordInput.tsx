"use client";

import { memo, useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Icons } from "@/src/components/atoms";
import { InputControllerWrapper } from "@/src/components/molecules";

interface PasswordInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  errorText?: string;
  placeholder?: string;
  disabled: boolean;
}

const PasswordInput = <T extends FieldValues>({
  name,
  label,
  errorText,
  placeholder,
  disabled,
  control,
}: PasswordInputProps<T>) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <InputControllerWrapper
      label={label}
      control={control}
      name={name}
      isLabelVisible
      isErrorLabelVisible
    >
      {(field) => (
        <div className="relative flex w-full flex-col">
          <div
            className={twMerge( 
              `border border-gray-50 bg-white placeholder:text-gray-50
            text-black flex w-full items-center 
              justify-center text-base rounded-md 
              transition-colors focus:outline-none px-4 py-3`,
              errorText && 'border-error',
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

            <span 
              onClick={() => setIsShown(curr => !curr)} 
              className="cursor-pointer"
            >
              {isShown ? <Icons.eyeClosed /> : <Icons.eye />}
            </span>
          </div>
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(PasswordInput) as typeof PasswordInput;
