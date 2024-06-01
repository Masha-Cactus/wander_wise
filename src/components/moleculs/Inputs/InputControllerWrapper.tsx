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
import { ErrorText } from "@/src/components/atoms";
import classNames from "classnames";

interface InputControllerWrapperProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  isLabelVisible: boolean;
  isErrorLabelVisible?: boolean;
  label?: string;
  children: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;

  marginBottom?: number;
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
        <div className="flex flex-col gap-3">
          <label 
            className={classNames('text-black text-xl font-medium',
            'relative flex flex-col w-full items-start',{
              'sr-only': !isLabelVisible,
            }
            )}
          >
            {label}
          </label>
          {/* {isLabelVisible && <label className="text-black text-xl font-medium 
          relative flex flex-col w-full items-start">{label}</label>} */}

          {children(field)}

          {isErrorLabelVisible && fieldState?.error?.message && (
            <ErrorText errorText={fieldState.error.message} />
          )}
        </div>
      )}
    />
  );
};

export default memo(InputControllerWrapper) as typeof InputControllerWrapper;
