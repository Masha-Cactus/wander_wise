'use client';

// import Radar from 'radar-sdk-js';
// import { useState } from 'react';

// const key = 'prj_live_pk_6925600add7305492567163191c2abbb9977c348';

// const LocationInput = () => {

//   const [location, setLocation] = useState('');

//   Radar.initialize(key);

//   Radar.ui.autocomplete({
//     container: 'autocomplete',
//     width: '600px',
//     onSelection: (address) => {
//       // do something with selected address
//     },
//   });

//   return (
//     <div id="autocomplete" className="w-full">
//       <input
//         type="text"
//         id="autocomplete"
//         className="w-full rounded-md border-gray-200 bg-white p-3 text-sm shadow-sm"
//         placeholder="Enter a location"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//       />
//     </div>
//   );
// };

// export default LocationInput;


import React, { useState, useEffect } from 'react';
import Radar from 'radar-sdk-js';

const key = 'prj_live_pk_6925600add7305492567163191c2abbb9977c348';

const LocationInput = () => {
  const [location, setLocation] = useState('');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);

  useEffect(() => {
    Radar.initialize(key);
  }, []);

  const handleLocationChange = async (e) => {
    const value = e.target.value;

    setLocation(value);

    if (value.trim() !== '') {
      const suggestions = await Radar.autocomplete({
        query: value,
        // categories: ['place'],
        limit: 5,
      });

      setAutocompleteSuggestions(suggestions.addresses);
    } else {
      setAutocompleteSuggestions([]);
    }
  };

  const handleSuggestionClick = (address) => {
    setLocation(address.formattedAddress);
    setAutocompleteSuggestions([]);
    // do something with selected address
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        id="locationInput"
        className="w-full rounded-md border-gray-200 bg-white p-3 text-sm shadow-sm text-zinc-950"
        placeholder="Enter a location"
        value={location}
        onChange={handleLocationChange}
      />
      {autocompleteSuggestions.length > 0 && (
        <div className="absolute bg-white border border-gray-200 rounded-b-md shadow-lg mt-1 w-full z-10 text-zinc-950">
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