import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export default function GoogleMaps({ venue }) {
  const cities = [
    { lat: 59.9112, lng: 10.7405 }, // Oslo
    { lat: 58.969975, lng: 5.733107 }, // Stavanger
    { lat: 60.3913, lng: 5.3221 }, // Bergen
    { lat: 63.4305, lng: 10.3951 }, // Trondheim
    { lat: 69.6496, lng: 18.956 }, // Tromsø
    { lat: 67.25903313507271, lng: 15.390365580500585 }, // Fauske
  ];

  const getRandomCity = () => {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
  };

  let position = getRandomCity(); // Set random position by default

  if (venue && venue.location && venue.location.lat && venue.location.lng) {
    position = { lat: venue.location.lat, lng: venue.location.lng };
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="h-40 md:h-80 rounded-lg overflow-hidden">
        <Map center={position} zoom={12} mapId={import.meta.env.VITE_MAP_ID}>
          {venue && venue.location && venue.location.lat && venue.location.lng && (
            <AdvancedMarker position={position}>
              <Pin background={"white"} borderColor={"grey"} glyphColor={"grey"}/>
            </AdvancedMarker>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
