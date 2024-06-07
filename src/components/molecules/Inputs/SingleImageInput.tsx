"use client";

import React, { memo, useState } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { 
  InputControllerWrapper, 
  ImageInputPlaceholder 
} from "@/src/components/molecules";

interface SingleFileInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  disabled: boolean;
}

const SingleImageInput = <T extends FieldValues>({
  control,
  name,
  disabled,
}: SingleFileInputProps<T>) => {
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
        <div className="w-full flex flex-col gap-3">
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
            className="w-full h-64 flex rounded-xl overflow-hidden relative"
          >
            <ImageInputPlaceholder image={field.value} />            
          </label>
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(SingleImageInput) as typeof SingleImageInput;