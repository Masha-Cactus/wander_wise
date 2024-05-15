"use client";

import { memo, useRef } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import InputControllerWrapper from "./InputControllerWrapper";
import Image from "next/image";
import { Heading5, TextBase } from "../../atoms";

interface FileInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  disabled: boolean;
  multiple: boolean;
}
// todo
// add 'multiple' functionality
// fix uploaded images styles

const ImageInput = <T extends FieldValues>({
  control,
  name,
  disabled,
  multiple
}: FileInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputControllerWrapper
      control={control}
      name={name}
      isLabelVisible={false}
      isErrorLabelVisible
    >
      {(field) => (
        <div className="w-full flex gap-3 justify-between">
          <input
            { ...field }
            id={name}
            type="file"
            accept="image/png, image/jpeg"
            disabled={disabled}
            multiple={multiple}
            ref={inputRef}
            className="hidden"
          />

          <label htmlFor={name} className="w-full flex">
            <div className="border border-black border-dashed bg-white
          text-black hover:bg-gray-50 h-64 w-full grow cursor-pointer
          transition-all duration-75 focus:outline-none rounded-xl
          flex items-center justify-center">
              <div className="flex flex-col gap-3 justify-center text-center">
                <Heading5 
                  text="Upload a cover photo or video" 
                  font="semibold" 
                />
                <TextBase text="JPG, JPEG, PNG" font="normal" />
                <TextBase text="Choose file" font="normal" />
              </div>
            </div>
          </label>

          {inputRef?.current?.files?.length && (
            <div className="relative flex flex-col w-16 h-full 
              overflow-y-scroll gap-3">
              {Array.from(inputRef?.current?.files).map((file, i) => (
                <Image 
                  key={i} 
                  src={URL.createObjectURL(file)}
                  width={0}
                  height={0}
                  style={{ width: '100%', height: 'auto' }}
                  alt="Card image" 
                />
              ))}
            </div>
          )}
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(ImageInput);
