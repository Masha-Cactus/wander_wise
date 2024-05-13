"use client";

import React, { useState, useEffect } from "react";
import Radar from "radar-sdk-js";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import InputControllerWrapper from "./InputControllerWrapper";
import classNames from "classnames";

const key = "prj_live_pk_6925600add7305492567163191c2abbb9977c348";

interface LocationInputProps <T extends FieldValues> {
  placeholder: string,
  label?: string,
  name: FieldPath<T>;
  control: Control<T>;
  disabled?: boolean;
  errorText?: string;
};

const LocationInput = <T extends FieldValues>({ 
  placeholder, label, name, control, disabled, errorText
}: LocationInputProps<T>) => {
  const [autocompleteSuggestions, setAutocompleteSuggestions] 
  = useState<RadarAutocompleteAddress[]>([]);

  useEffect(() => {
    Radar.initialize(key);
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
            onChange={(e) => {
              handleLocationChange(e);
              field.onChange(e.target.value);
            }}
            className={classNames(
              `border border-gray50 bg-white
              text-black hover:bg-gray-50 flex h-10 w-full items-center
              justify-center space-x-3 text-sm shadow-sm rounded-md
              transition-all duration-75 focus:outline-none px-3`,
              {
                "border-error": errorText,
              }
            )}
          />
          {autocompleteSuggestions.length > 0 && (
            <div
              className="absolute bg-white border border-gray-200 
               rounded-b-md shadow-lg mt-11 w-full z-10 text-zinc-950"
            >
              {autocompleteSuggestions.map((address) => (
                <div
                  key={address.addressLabel}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    field.onChange(address.formattedAddress);
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

export default LocationInput;
