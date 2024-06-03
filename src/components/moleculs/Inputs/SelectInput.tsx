'use client';

import classNames from "classnames";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { Icons, TextMedium } from "@/src/components/atoms";
import { InputControllerWrapper } from "@/src/components/moleculs";
import { useState, memo } from "react";
import IconButton from "../Buttons/IconButton";
  
interface SelectInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  errorText?: string;
  placeholder?: string;
  label?: string;
  disabled: boolean;
}
  
const SelectInput = <T extends FieldValues>({
  name,
  control,
  errorText,
  placeholder,
  label,
  disabled,
}: SelectInputProps<T>) => {
  const [currentValue, setCurrentValue] = useState('');
  const handleAdd = (field: ControllerRenderProps<T, Path<T>>) => {
    if (currentValue.trim()) {
      field.onChange([...field.value, currentValue]);
      setCurrentValue("");
    }
  };

  return (
    <InputControllerWrapper
      control={control}
      name={name}
      isLabelVisible
      isErrorLabelVisible
      label={label}
    >
      {(field) => (
        <div className="relative flex flex-col w-full">
          <input
            {...field}
            id={name}
            type="text"
            disabled={disabled}
            placeholder={placeholder ? placeholder : ''}
            onChange={(e) => setCurrentValue(e.target.value)}
            value={currentValue}
            className={classNames(
              `border bg-white grow
            text-black hover:bg-gray-50 flex h-10 w-full items-center
            justify-center space-x-3 text-sm shadow-sm rounded-md
            transition-all duration-75 focus:outline-none px-3`,
              {
                "border-error": errorText,
                "border-gray50": !errorText,
              }
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd(field);
              }
            }}
            onBlur={() => handleAdd(field)}
          />
          {field.value.length > 0 && (
            <ul
              className="mt-3 w-full z-10 flex flex-col gap-2"
            >
              {field.value.map((value: string) => (
                <li
                  key={value}
                  className="px-4
                    flex justify-between w-full items-center"
                >
                  <div className="flex gap-3 grow items-center">
                    <div className="w-2 h-2 bg-gray80 rounded-full" />
                    <TextMedium text={value} font="normal" />
                  </div>
                  <IconButton
                    icon={<Icons.delete />}
                    classes="p-0 h-6 w-6 text-gray80"
                    onClick={() => 
                      field.onChange(
                        field.value.filter((v: string) => v !== value))
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </InputControllerWrapper>
  );
};
  
export default memo(SelectInput) as typeof SelectInput;