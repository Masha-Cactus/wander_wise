"use client";

import React, { memo, useState } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/moleculs";
import Image from "next/image";
import { Heading5, Icons, TextBase } from "@/src/components/atoms";

interface FileInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  disabled: boolean;
  multiple: boolean;
}

const ImageInput = <T extends FieldValues>({
  control,
  name,
  disabled,
  multiple
}: FileInputProps<T>) => {
  const [value, setValue] = useState('');

  const handleAdd = (
    field: ControllerRenderProps<T, Path<T>>, 
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);
    field.onChange(
      [ ...Array.from(event.target.files || []),
        ...field.value,
      ]
    );
  };

  const handleDelete = (
    field: ControllerRenderProps<T, Path<T>>,
    index: number
  ) => {
    const updatedValue: File[] = [...field.value];

    updatedValue.splice(index, 1);
    field.onChange(updatedValue);
  };

  return (
    <InputControllerWrapper
      control={control}
      name={name}
      isLabelVisible={false}
      isErrorLabelVisible
    >
      {(field) => (
        <div className="w-full flex flex-col gap-3">
          <input
            { ...field }
            id={name}
            type="file"
            accept="image/png, image/jpeg"
            disabled={disabled}
            multiple={multiple}
            value={value}
            onChange={(e) => handleAdd(field, e)}
            className="hidden"
          />

          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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

          {!!field.value.length && (
            <div className="relative flex w-full h-28 
              overflow-x-scroll gap-3">
              {(field.value as File[]).map((file, i) => (
                <div key={i} className="relative group h-full w-40 shrink-0">
                  <Image 
                    src={URL.createObjectURL(file)}
                    width={0}
                    height={0}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '15px', 
                    }}
                    alt="Card image"
                  />
                  <Icons.delete
                    className="absolute top-2 right-2 rounded-full w-6 h-6 p-1 
                    border border-white bg-error hidden text-white 
                    group-hover:block group-hover:cursor-pointer"
                    onClick={() => handleDelete(field, i)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(ImageInput) as typeof ImageInput;
