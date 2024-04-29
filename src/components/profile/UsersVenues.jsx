import { useEffect, useState } from "react";
import { fetchVenuesByProfile } from "../../libs/api/Venues";
import SingleVenueModal from "../modal/SingleVenueModal";
import UpdateVenueModal from "../modal/UpdateVenueModal";

function UsersVenues() {
  const searchParams = new URLSearchParams(window.location.search);
  const userName = searchParams.get("name");
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserVenues = async () => {
      try {
        if (userName) {
          const data = await fetchVenuesByProfile(userName);
          setVenues(data || []);
        } else {
          console.warn("User name is not provided.");
        }
      } catch (error) {
        console.error("Error fetching user venues:", error);
      }
    };

    fetchUserVenues();
  }, [userName]);

  // Function to handle opening the modal for a selected venue
  const handleVenueClick = (venueId) => {
    setSelectedVenueId(venueId);
    setIsModalOpen(true);
  };

  const handleUpdateVenueClick = (venueId) => {
    setSelectedVenueId(venueId);
    setUpdateModalOpen(true);
  };

  const handleUpdateVenueSuccess = async (updatedVenueData) => {
    // Update the venues array with the updated venue data
    setVenues((prevVenues) =>
      prevVenues.map((venue) =>
        venue.id === updatedVenueData.id ? updatedVenueData : venue
      )
    );
  
    try {
      // Refetch the venues to get the latest data
      const data = await fetchVenuesByProfile(userName);
      setVenues(data || []);
    } catch (error) {
      console.error("Error refetching user venues:", error);
    }
  };

  const handleDeleteVenueSuccess = async () => {
    try {
      // Fetch the latest venue data after deletion
      const updatedVenues = await fetchVenuesByProfile(userName);
  
      // Update the venues array with the latest data
      setVenues(updatedVenues || []);

    } catch (error) {
      console.error("Error updating venue list after deletion:", error);
    }
  };
  

  useEffect(() => {
    // Update body overflow based on modal state
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  return (
    <main className="container mx-auto lg:px-20 mt-4 text-black">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {venues.map(({ id, name, description, media }) => (
          <div key={id} className="relative">
            <div className="venue-link cursor-pointer">
              <div
                onClick={() => handleVenueClick(id)}
                className="venue-item overflow-hidden border p-4 rounded-3xl shadow-xl"
              >
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                  {media[0]?.url && ( // Check if media[0].url exists
                    <img
                      src={media[0].url}
                      alt="Venue Image"
                      className="object-cover w-full h-full hover:scale-110 transition"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 px-2">
                  <div className="font-semibold text-xl text-gray-700 mt-3">
                    {name}
                  </div>
                  <div className="text-gray-600">{description}</div>
                </div>
              </div>
            </div>
            {/* Button to open Update Venue Modal */}
            <button
              onClick={() => handleUpdateVenueClick(id)}
              className="p-2 mt-2 bg-gradient-to-b from-rose-600 to-rose-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
            >
              Update Venue
            </button>
          </div>
        ))}
      </div>
      <SingleVenueModal
        isModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        venueId={selectedVenueId}
      />
      {updateModalOpen && (
        <UpdateVenueModal
          venueId={selectedVenueId}
          closeModal={() => setUpdateModalOpen(false)}
          name={
            venues.find((venue) => venue.id === selectedVenueId)?.name || ""
          }
          description={
            venues.find((venue) => venue.id === selectedVenueId)?.description ||
            ""
          }
          media={
            venues.find((venue) => venue.id === selectedVenueId)?.media || []
          }
          onUpdateSuccess={handleUpdateVenueSuccess}
          onDeleteSuccess={handleDeleteVenueSuccess}
        />
      )}

    </main>
  );
}

export default UsersVenues;
