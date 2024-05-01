import { useState, useEffect } from "react";
import { fetchAllVenues, searchVenues } from "../libs/api/Venues";
import { FaStar } from "react-icons/fa";
import SearchBar from "../components/header/Searchbar";
import SingleVenueModal from "../components/modal/SingleVenueModal";
import LikeButton from "../components/buttons/LikeButton";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update body overflow based on modal state
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const fetchData = async () => {
    try {
      const data = await fetchAllVenues();
      setVenues(data.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  // Function to handle search
  const handleSearch = async ({ guests }) => {
    try {
      // Fetch all venues
      const data = await fetchAllVenues();
  
      // Filter venues based on the number of guests
      const filteredVenues = data.data.filter((venue) => venue.maxGuests >= guests);
  
      // Update the state with filtered venues
      setVenues(filteredVenues);
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };

  // Function to open modal for selected venue
  const handleVenueClick = async (venueId) => {
    setSelectedVenueId(venueId);
    setIsModalOpen(true);
  };

  const handleLikeButtonClick = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true; // For older versions of IE
    }
  };

  return (
    <div className="flex flex-col items-center px-12">
      {/* Render the SearchBar component and pass the handleSearch function */}
      <SearchBar onSearch={handleSearch} />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="border border-gray-200 rounded-2xl cursor-pointer hover:shadow-lg transition duration-200 ease-in-out"
            onClick={() => handleVenueClick(venue.id)}
          >
            <div>
              {venue.media && venue.media.length > 0 && (
                <>
                  <div className="relative">
                    {" "}
                    <img
                      src={venue.media[0].url}
                      alt={venue.media[0].alt}
                      className="w-full h-48 object-cover rounded-tl-2xl rounded-tr-2xl mb-1"
                    />
                    <div className="absolute top-4 right-4 z-10">
                      <LikeButton onClick={handleLikeButtonClick} />
                    </div>
                  </div>

                  <div className="flex flex-col h-40 justify-between pt-3 pb-4 px-4">
                    <div className="flex flex-col">
                      <h1 className="md:text-xl font-semibold text-gray-700">
                        {venue.name.charAt(0).toUpperCase() +
                          venue.name.slice(1)}
                      </h1>
                      <h2 className="text-sm md:text-base text-gray-500">
                        {venue.location.city && (
                          <>
                            {venue.location.city.charAt(0).toUpperCase() +
                              venue.location.city.slice(1)}
                            {venue.location.country || venue.location.continent
                              ? ", "
                              : ""}
                          </>
                        )}
                        {venue.location.country && (
                          <>
                            {venue.location.country.charAt(0).toUpperCase() +
                              venue.location.country.slice(1)}
                            {venue.location.continent ? ", " : ""}
                          </>
                        )}
                        {venue.location.continent && (
                          <>
                            {venue.location.continent.charAt(0).toUpperCase() +
                              venue.location.continent.slice(1)}
                          </>
                        )}
                      </h2>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-semibold text-gray-700">
                        ${venue.price.toFixed(0)}{" "}
                        <span className="text-sm text-gray-500 font-thin">
                          / per night
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <FaStar size={15}/>
                        <div className="mt-1">{venue.rating}.0</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <SingleVenueModal
        isModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        venueId={selectedVenueId}
      />
    </div>
  );
};

export default Venues;
