import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

import { FaArrowRight } from "react-icons/fa";

export default function GeoMap({ onPositionChange, handleChange, handleSearch }) {
  const [searchedCity, setSearchedCity] = useState("");
  const [position, setPosition] = useState({ lat: 53.54, lng: 10 });
  const [zoom, setZoom] = useState(1.7);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSearchedCity(city); // Update the searched city in the state
    handleChange({ target: { name: "city", value: city } }); // Update the city in the form data
  };

  const performSearch = async () => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchedCity}&key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }`
    );
    const data = await response.json();
    if (data.results.length === 0) {
      throw new Error("Location not found. Please try again.");
    }
    const location = data.results[0].geometry.location;
    const newPosition = { 
      lat: location.lat, 
      lng: location.lng,
      country: data.results[0].address_components.find(
        (component) => component.types.includes("country")
      )?.long_name || ''
    };

    const city = data.results[0].address_components.find(
      (component) => component.types.includes("locality")
    )?.long_name || '';

    const finalCity = city ? city : searchedCity;

    setSearchedCity(`${finalCity}, ${newPosition.country}`);

    handleChange({
      target: {
        name: "city",
        value: `${finalCity}, ${newPosition.country}` 
      }
    });

    handleChange({
      target: {
        name: "country",
        value: newPosition.country
      }
    });

    setPosition(newPosition);
    onPositionChange(newPosition);

    if (zoom === 1.7) {
      setZoom(9);
    }

    handleSearch(newPosition.country); 

    setSearchPerformed(true);
    setErrorMessage("");
  } catch (error) {
    console.error("Error fetching data:", error);
    setErrorMessage(error.message);
  }
};
  
  
  

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="flex items-center gap-6">
        <div className="w-full relative">
          <input
            type="text"
            value={searchedCity}
            onChange={handleCityChange}
            className="peer w-full pt-6 pb-2 ps-4 bg-white border-2 rounded-md outline-none transition hover:border-gray-500 focus:border-gray-500 cursor-pointer"
          />
          <label
            className="
              text-gray-500
        absolute 
        duration-150 
        transform 
        -translate-y-3 
        top-5 
        z-10 
        origin-[0] 
        left-4
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-4
      "
          >
            Anywhere
          </label>
        </div>
        <div>
          <button
            className="flex justify-center items-center gap-6 font-semibold bg-gray-700 text-white ps-8 pe-4 py-3 rounded-xl relative"
            type="button"
            onClick={performSearch}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Search
            <span
              className={`transition-transform duration-200 ease-in-out ${
                isHovered ? "translate-x-2" : "-translate-x-2"
              }`}
            >
              <FaArrowRight />
            </span>{" "}
          </button>
        </div>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="h-72 border-2 rounded-lg overflow-hidden my-4">
        <Map
          center={position}
          zoom={zoom}
          mapId={import.meta.env.VITE_MAP_ID}
          className="h-full"
        >
          {searchPerformed && (
            <AdvancedMarker position={position}>
              <Pin background={"white"} borderColor={"grey"} glyphColor={"grey"} />
            </AdvancedMarker>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
