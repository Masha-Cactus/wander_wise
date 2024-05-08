"use client";

import React, { useState, useEffect } from "react";
import Radar from "radar-sdk-js";
import FilterInput from "./FilterInput";

const key = "prj_live_pk_6925600add7305492567163191c2abbb9977c348";

type Props = {
  onChange: (value: string) => void;
  value: string;
};

const LocationInput: React.FC<Props> = ({ onChange, value }) => {
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  useEffect(() => {
    Radar.initialize(key);
  }, []);

  const handleLocationChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const value = e.target.value;

    onChange(value);

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

  const handleSuggestionClick = (address) => {
    onChange(address.formattedAddress);
    setAutocompleteSuggestions([]);
  };

  return (
    <div className="relative w-full text-black mt-4">
      <FilterInput
        onChange={handleLocationChange}
        value={value}
        id="locationInput"
      />
      {autocompleteSuggestions.length > 0 && value.trim() !== "" && (
        <div
          className="absolute bg-white border border-gray-200 
        rounded-b-md shadow-lg mt-1 w-full z-10 text-zinc-950"
        >
          {autocompleteSuggestions.map((address) => (
            <div
              key={address.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(address)}
            >
              {address.formattedAddress}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
