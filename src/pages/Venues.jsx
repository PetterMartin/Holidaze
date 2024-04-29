import { useState, useEffect } from "react";
import { fetchAllVenues, searchVenues } from "../libs/api/Venues";
import SingleVenueModal from "../components/modal/SingleVenueModal";

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
  const handleSearch = async (query) => {
    try {
      const data = await searchVenues(query);
      setVenues(data.data);
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };

  // Function to handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Update search results automatically while typing
    handleSearch(query);
  };

  // Function to open modal for selected venue
  const handleVenueClick = async (venueId) => {
    setSelectedVenueId(venueId);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search venues..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className="p-4 border border-gray-300 rounded-md cursor-pointer"
            onClick={() => handleVenueClick(venue.id)}
          >
            <div>
              {venue.media && venue.media.length > 0 && (
                <>
                  <img
                    src={venue.media[0].url}
                    alt={venue.media[0].alt}
                    className="rounded-md mb-2"
                  />
                  <h2 className="text-xl font-bold">{venue.name}</h2>
                  <p className="text-gray-600">{venue.description}</p>
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
