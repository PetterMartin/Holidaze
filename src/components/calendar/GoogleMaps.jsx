import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export default function GoogleMaps({ venue, latitude, longitude }) {
  let position = { lat: 53.54, lng: 10 };

  if (venue && venue.location && venue.location.lat && venue.location.lng) {
    position = { lat: venue.location.lat, lng: venue.location.lng };
  }

  if (!isNaN(latitude) && !isNaN(longitude)) {
    position = { lat: latitude, lng: longitude };
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="h-40 md:h-80 border-2 rounded-lg overflow-hidden">
        <Map center={position} defaultZoom={8} mapId={import.meta.env.VITE_MAP_ID}>
          <AdvancedMarker position={position}>
            <Pin background={"white"} borderColor={"grey"} glyphColor={"grey"} />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}
