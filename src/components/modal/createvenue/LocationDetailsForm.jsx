import { useState } from "react";
import GeoMap from "../../calendar/GeoMap";

const LocationDetailsForm = ({
  formData,
  handleChange,
  handlePositionChange,
}) => {
  const [searchClicked, setSearchClicked] = useState(false); // State to track if search button clicked

  // Function to format latitude and longitude to one decimal place
  const formatValue = (value) => {
    return value.toFixed(1);
  };

  const handleSearch = () => {
    // Update state to indicate search button clicked
    setSearchClicked(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">
        Where are you located?
      </h1>
      <div className="font-light text-neutral-500 mt-2 mb-6">
        Type in street address, city or country
      </div>
      <div className="flex flex-col">
        <div className="h-40 md:h-96 overflow-hidden">
          <GeoMap
            onPositionChange={handlePositionChange}
            handleChange={handleChange}
            handleSearch={handleSearch}
          />
        </div>
        {/* Display latitude and longitude only if search button is clicked */}
        {searchClicked && (
          <div className="flex justify-between gap-4">
            <div className="flex gap-1 text-sm">
              <label className="block text-gray-700 mb-1">Lat:</label>
              {/* Hidden input field with actual value */}
              <input
                type="number"
                name="lat"
                value={formData.location.lat}
                onChange={handleChange}
                className="hidden"
              />
              {/* Display latitude value rounded to one decimal place */}
              <div>{formatValue(formData.location.lat)}</div>
            </div>
            <div className="flex gap-1 text-sm">
              <label className="block text-gray-700 mb-1">Lng:</label>
              {/* Hidden input field with actual value */}
              <input
                type="number"
                name="lng"
                value={formData.location.lng}
                onChange={handleChange}
                className="hidden"
              />
              {/* Display longitude value rounded to one decimal place */}
              <div>{formatValue(formData.location.lng)}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationDetailsForm;
