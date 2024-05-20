import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export default function GeoMap({ onPositionChange }) {
  const [city, setCity] = useState(""); // State to store the value entered in the input field
  const [position, setPosition] = useState({ lat: 53.54, lng: 10 }); // Default position

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = async () => {
    try {

      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`);
      const data = await response.json();
      const location = data.results[0].geometry.location;
      setPosition({ lat: location.lat, lng: location.lng }); 
      onPositionChange({ lat: location.lat, lng: location.lng });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="flex justify-between p-4">
        <input type="text" value={city} onChange={handleCityChange} placeholder="Enter a city name" />
        <button type="button" onClick={handleSearch}>Search</button>
      </div>
      <div className="h-full border-2 rounded-lg overflow-hidden">
        <Map center={position} defaultZoom={8} mapId={import.meta.env.VITE_MAP_ID}>
          <AdvancedMarker position={position}>
            <Pin background={"white"} borderColor={"grey"} glyphColor={"grey"} />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}