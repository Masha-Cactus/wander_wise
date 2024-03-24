import ReactGoogleAutocomplete from "react-google-autocomplete";
const key = 

const LocationInput = () => {

  return (
    <ReactGoogleAutocomplete
      apiKey={YOUR_GOOGLE_MAPS_API_KEY}
      onPlaceSelected={(place) => console.log(place)}
    />

  // const { ref } = usePlacesWidget({
  //   apiKey: YOUR_GOOGLE_MAPS_API_KEY,
  //   onPlaceSelected: (place) => console.log(place)
  // })

  // <AnyInput ref={ref} />
  );
};

export default LocationInput;