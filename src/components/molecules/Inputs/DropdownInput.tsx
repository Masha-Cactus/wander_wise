'use client';

import { memo, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useWatch,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Heading5, Icons, TextBase, ErrorText } from "@/src/components/atoms";
import { ButtonCheckboxInput, IconButton } from "@/src/components/molecules";

interface DropdownInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  errorText?: string;
  placeholder?: string;
  options: string[],
  label?: string;
}
  
const DropdownInput = <T extends FieldValues>({
  options,
  name,
  control,
  errorText,
  placeholder,
  label,
}: DropdownInputProps<T>) => {
  const [isExtended, setIsExtended] = useState(false);
  const selectedOptions = useWatch({
    control,
    name,
  });

  return (
    <div className="flex w-full flex-col gap-3">
      {!!label && (
        <Heading5 text={label} font="medium" />
      )}
      <div
        className={twMerge(
          `border border-gray-50 bg-white grow relative
            text-black flex w-full items-center
            rounded-md gap-4 placeholder:text-gray-50
            transition-colors focus:outline-none px-4 py-3`,
          errorText && 'border-error',
        )}
      >
        <div className="flex grow items-center justify-between">
          <div className="flex h-10 items-center gap-2">
            {selectedOptions.length ? (
              <>
                {selectedOptions.slice(0,3).map((option: string) => (
                  <div 
                    key={option}
                    className="text-regular w-max rounded-full bg-gray-80 px-3 
                   py-2 text-sm text-white"
                  >
                    {option}
                  </div>
                ))}
              </>
            ) : (
              <TextBase 
                text={placeholder || ''} 
                font="normal" 
                classes="text-gray-50 h-fit" 
              />
            )}
          </div>
          {selectedOptions.length > 3 && (
            <TextBase 
              text={`+${selectedOptions.length - 3} others`} 
              font="normal" 
              classes="h-fit" 
            />
          )}
        </div>
        
        <IconButton 
          icon={ isExtended 
            ? <Icons.up className="h-6 w-6" /> 
            : <Icons.down className="h-6 w-6" />
          }
          onClick={() => setIsExtended(isExt => !isExt)}
          classes="p-0"
        />
      </div>

      {isExtended && (
        <div
          className="flex w-full 
            flex-wrap gap-2 rounded-b-md border border-gray-50 
            bg-white px-4 py-3 shadow-lg"
        >
          {options.map((option: string) => (
            <ButtonCheckboxInput 
              key={option} 
              value={option} 
              name={name} 
              control={control} 
            />
          ))}
        </div>
      )}

      {!!errorText && <ErrorText errorText={errorText} />}
    </div>
  );
};
  
export default memo(DropdownInput) as typeof DropdownInput;