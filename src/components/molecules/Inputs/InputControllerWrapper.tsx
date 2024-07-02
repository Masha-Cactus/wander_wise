'use client';

import { memo, ReactNode } from "react";
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { ErrorText } from "@/src/components/atoms";

interface InputControllerWrapperProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  isLabelVisible: boolean;
  isErrorLabelVisible?: boolean;
  label?: string;
  children: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
}

const InputControllerWrapper = <T extends FieldValues>({
  isLabelVisible,
  isErrorLabelVisible = true,
  control,
  name,
  label,
  children,
}: InputControllerWrapperProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div 
          className={twMerge('flex flex-col', isLabelVisible && 'gap-3')}
        >
          <label
            htmlFor={name}
            className={twMerge(`text-black text-xl font-medium
            relative flex flex-col w-full items-start`,
            !isLabelVisible && 'sr-only'
            )}
          >
            {label}
          </label>

          {children(field)}

          {isErrorLabelVisible && fieldState?.error?.message && (
            <ErrorText errorText={fieldState.error.message} classes="w-fit" />
          )}
        </div>
      )}
    />
  );
};

export default memo(InputControllerWrapper) as typeof InputControllerWrapper;
