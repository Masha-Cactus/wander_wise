"use client";

import React, { memo, useState } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import Image from "next/image";
import { 
  InputControllerWrapper,
  ImageInputPlaceholder,
  IconButton 
} from "@/src/components/molecules";
import { Icons } from "@/src/components/atoms";

interface MultipleFileInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  disabled: boolean;
}

const MultipleFileInput = <T extends FieldValues>({
  control,
  name,
  disabled,
}: MultipleFileInputProps<T>) => {
  const [value, setValue] = useState('');

  const handleAdd = (
    field: ControllerRenderProps<T, Path<T>>, 
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);

    field.onChange(
      [ ...Array.from(event.target.files || []),
        ...field.value]
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
      isErrorLabelVisible={false}
    >
      {(field) => (
        <div className="flex w-full flex-col gap-3">
          <input
            { ...field }
            id={name}
            type="file"
            accept="image/png, image/jpeg"
            disabled={disabled}
            multiple={true}
            value={value}
            onChange={(e) => handleAdd(field, e)}
            className="hidden"
          />

          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label 
            htmlFor={name} 
            className="relative flex h-64 w-full overflow-hidden rounded-xl"
          >
            <ImageInputPlaceholder 
              image={field.value[field.value.length - 1]} 
            />
          </label>

          {!!field.value.length && (
            <div className="relative flex h-28 w-full 
              gap-3 overflow-x-scroll">
              {(field.value as File[]).map((file, i) => (
                <div key={i} className="group relative h-full w-40 shrink-0">
                  <Image 
                    src={URL.createObjectURL(file)}
                    fill
                    sizes="160px"
                    className="rounded-2xl object-cover"
                    alt="Card image"
                  />
                  <IconButton 
                    icon={<Icons.delete className="h-5 w-5" />} 
                    classes="absolute top-2 right-2 rounded-full p-1 
                    border-1 border-white bg-error hidden text-white
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

export default memo(MultipleFileInput) as typeof MultipleFileInput;