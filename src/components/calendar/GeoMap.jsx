import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

import { FaArrowRight } from "react-icons/fa";

export default function GeoMap({ onPositionChange, handleSearch }) {
  const [city, setCity] = useState(""); 
  const [position, setPosition] = useState({ lat: 53.54, lng: 10 }); 
  const [zoom, setZoom] = useState(1.7); 
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const performSearch = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        throw new Error("Location not found. Please try again.");
      }
      const location = data.results[0].geometry.location;
      setPosition({ lat: location.lat, lng: location.lng });
      onPositionChange({ lat: location.lat, lng: location.lng });
      if (zoom === 1.7) {
        setZoom(12);
      }
      handleSearch();
      setSearchPerformed(true);
      setErrorMessage(""); // Clear error message on successful search
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage(error.message); // Set error message on search failure
    }
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="flex gap-6">
        <div className="w-full relative">
          <input
            type="text"
            value={city}
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
        <button
          className="flex justify-center items-center gap-6 font-semibold bg-gradient-to-b from-rose-400 to-rose-500 text-white ps-8 pe-4 py-3 rounded-xl transition duration-200 ease-in-out hover:opacity-80"
          type="button"
          onClick={performSearch} 
        >
          Search <FaArrowRight />
        </button>
      </div>
      {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}
      <div className="h-72 border-2 rounded-lg overflow-hidden my-4">
        <Map
          center={position}
          zoom={zoom}
          mapId={import.meta.env.VITE_MAP_ID}
          className="h-full"
        >
          {searchPerformed && ( 
            <AdvancedMarker position={position}>
              <Pin
                background={"white"}
                borderColor={"grey"}
                glyphColor={"grey"}
              />
            </AdvancedMarker>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
