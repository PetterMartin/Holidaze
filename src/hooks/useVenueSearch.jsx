import { useState } from 'react';
import { fetchAllVenues } from '../libs/api/Venues';

const useVenueSearch = () => {
  const [venues, setVenues] = useState([]);

  const searchVenues = async ({ guests, searchText }) => {
    try {
      const data = await fetchAllVenues();

      let filteredVenues = data.data.filter(
        (venue) => venue.maxGuests >= guests
      );

      if (searchText) {
        const search = searchText.toLowerCase();
        filteredVenues = filteredVenues.filter((venue) => {
          const location = venue.location;
          if (!location) return false;
          const city = location.city ? location.city.toLowerCase() : "";
          const country = location.country ? location.country.toLowerCase() : "";
          const continent = location.continent ? location.continent.toLowerCase() : "";
          return (
            city.includes(search) ||
            country.includes(search) ||
            continent.includes(search)
          );
        });
      }

      setVenues(filteredVenues);
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };

  return { venues, searchVenues };
};

export default useVenueSearch;
