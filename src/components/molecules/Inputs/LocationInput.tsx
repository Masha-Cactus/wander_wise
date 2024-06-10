"use client";

import React, { useState, useEffect, memo } from "react";
import Radar from "radar-sdk-js";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
import { Control, FieldPath, FieldValues, useWatch } from "react-hook-form";
import { InputControllerWrapper } from "@/src/components/molecules";
import { twMerge } from "tailwind-merge";

interface LocationInputProps <T extends FieldValues> {
  placeholder: string,
  label?: string,
  name: FieldPath<T>;
  control: Control<T>;
  disabled?: boolean;
  errorText?: string;
  defaultLocation?: string;
};

const LocationInput = <T extends FieldValues>({ 
  placeholder, label, name, control, disabled, errorText, defaultLocation
}: LocationInputProps<T>) => {
  const [autocompleteSuggestions, setAutocompleteSuggestions] 
  = useState<RadarAutocompleteAddress[]>([]);

  useEffect(() => {
    Radar.initialize(process.env.NEXT_PUBLIC_RADAR_KEY as string);
  }, []);

  const handleLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const value = e.target.value;

    if (value.trim() !== "") {
      const suggestions = await Radar.autocomplete({
        query: value,
        layers: ["locality"],
        limit: 5,
      });

      setAutocompleteSuggestions(suggestions.addresses);
    } else {
      setAutocompleteSuggestions([]);
    }
  };

  const [value, setValue] = useState(defaultLocation || '');
  const locationFieldValue = useWatch({control, name});

  useEffect(() => {
    if (!locationFieldValue) {
      setValue(defaultLocation || '');
    }
  }, [locationFieldValue, defaultLocation]);

  return (
    <InputControllerWrapper
      label={label}
      control={control}
      name={name}
      isLabelVisible
      isErrorLabelVisible
    >
      {(field) => (
        <div className="relative flex flex-col w-full">
          <input
            {...field}
            id={name}
            type="text"
            disabled={disabled}
            placeholder={placeholder ? placeholder : `Enter your ${name}`}
            value={value}
            onChange={(e) => {
              handleLocationChange(e);
              setValue(e.target.value);
            }}
            className={twMerge(
              `border border-gray-50 bg-white placeholder:text-gray-50
              text-black flex w-full items-center
              justify-center text-base rounded-md
              transition-colors focus:outline-none px-4 py-3`,
              errorText && 'border-error',
            )}
          />
          {autocompleteSuggestions.length > 0 && (
            <div
              className="absolute bg-white border border-gray-200 
               rounded-b-md shadow-lg mt-11 w-full z-10 text-zinc-950"
            >
              {autocompleteSuggestions.map((address, i) => (
                <div
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    field.onChange(address);
                    setValue(address.formattedAddress || '');
                    setAutocompleteSuggestions([]);
                  }}
                >
                  {address.formattedAddress}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </InputControllerWrapper>
  );
};

export default memo(LocationInput) as typeof LocationInput;
