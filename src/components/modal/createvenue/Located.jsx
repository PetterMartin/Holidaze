import GeoMap from "../../calendar/GeoMap";

const LocationDetailsForm = ({ formData, handleChange, handlePositionChange }) => {

  return (
    <div>
      <h1 className="font-semibold text-gray-700 ms-2">Where are you located?</h1>
      <div className="flex flex-col gap-2">
        <div className="h-40 md:h-80 overflow-hidden">
          {/* Render the GeoMap component */}
          <GeoMap onPositionChange={handlePositionChange} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-800 mb-1">Latitude</label>
          <input
            type="number"
            name="lat"
            value={formData.location.lat}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-neutral-800 mb-1">Longitude</label>
          <input
            type="number"
            name="lng"
            value={formData.location.lng}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsForm;
