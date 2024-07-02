"use client";

import React, { useState, useEffect, memo } from "react";
import Radar from "radar-sdk-js";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
import { Control, FieldPath, FieldValues, useWatch } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { InputControllerWrapper } from "@/src/components/molecules";

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
        <div className="relative flex w-full flex-col">
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
              className="absolute top-full z-10 
              w-full rounded-b-md bg-white shadow-lg"
            >
              {autocompleteSuggestions.map((address, i) => (
                <div
                  key={i}
                  className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-20"
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
