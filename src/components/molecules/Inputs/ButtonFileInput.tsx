"use client";

import React, { memo, useState } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/molecules";
import { Icons, TextBase } from "@/src/components/atoms";

interface ButtonFileInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  disabled: boolean;
}

const ButtonFileInput = <T extends FieldValues>({
  control,
  name,
  disabled,
}: ButtonFileInputProps<T>) => {
  const [value, setValue] = useState('');

  const handleAdd = (
    field: ControllerRenderProps<T, Path<T>>, 
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(event.target.value);

    if (event.target.files) {
      field.onChange(event.target.files[0]);
    }
  };

  return (
    <InputControllerWrapper
      control={control}
      name={name}
      isLabelVisible={false}
      isErrorLabelVisible
    >
      {(field) => (
        <div className="flex w-full flex-col gap-3">
          <input
            { ...field }
            id={name}
            type="file"
            accept="image/png, image/jpeg"
            disabled={disabled}
            value={value}
            onChange={(e) => handleAdd(field, e)}
            className="hidden"
          />

          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label 
            htmlFor={name} 
            className="flex w-full cursor-pointer items-center justify-center 
            gap-1 p-2 text-gray-80 hover:text-gray-50"
          >
            <Icons.download className="h-4 w-4 text-inherit" />
            <TextBase text="Upload image" font="normal" classes="text-inherit"/>
          </label>
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(ButtonFileInput) as typeof ButtonFileInput;