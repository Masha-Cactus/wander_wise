"use client";

import { ChangeEvent, memo, useRef } from "react";
import {
  FieldPath,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import classNames from "classnames";
import { ErrorText } from "@/src/components/atoms";

interface FileInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  buttonTitles: string[];
  isFileUploaded: boolean;
  disabled: boolean;
  onUploadFile: (file: File) => void;
  onRemoveFile: () => void;
  register: UseFormRegister<any>;
  errorText?: string;
}

const ImageInput = <T extends FieldValues>({
  isFileUploaded,
  buttonTitles,
  onUploadFile,
  onRemoveFile,
  register,
  errorText,
  name,
  disabled,
}: FileInputProps<T>) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadFile = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const originalFile = event.target.files?.[0];

    if (originalFile) {
      onUploadFile(originalFile);
    }
  };

  const handleButtonClick = () => inputRef.current?.click();

  const handleRemoveFile = () => {
    onRemoveFile();
  };

  return (
    <div className="">
      <label
        className="text-black relative block uppercase 
          flex flex-col w-full items-start"
      >
        {name}
        <input
          id={name}
          type="file"
          accept="image/png, image/jpeg"
          {...register(name)}
          disabled={disabled}
          placeholder={`Enter your ${name}`}
          className={classNames(
            `border-b border-black bg-white
          text-black hover:bg-gray-50 flex h-10 w-full items-center
          justify-center space-x-3 text-sm shadow-sm
          transition-all duration-75 focus:outline-none`,
            {
              "border-error": errorText,
            }
          )}
          ref={inputRef}
          onChange={(event) => handleUploadFile(event)}
        />
        {errorText && <ErrorText errorText={errorText} />}
      </label>

      {isFileUploaded && (
        <button onClick={handleRemoveFile}>Remove</button>
      )}

      <button onClick={handleButtonClick}>
        {isFileUploaded ? buttonTitles[0] : buttonTitles[1]}
      </button>
    </div>
  );
};

export default memo(ImageInput);
