import { useEffect, useState } from "react";
import { fetchVenuesByProfile } from "../../libs/api/Venues";
import { useAuth } from "../../context/auth/Auth";
import { getProfile } from "../../libs/api/Profiles";
import SingleVenueModal from "../modal/SingleVenueModal";
import UpdateVenueModal from "../modal/UpdateVenueModal";
import { FaStar } from "react-icons/fa";
import LikeButton from "../buttons/LikeButton";

function UsersVenues() {
  const searchParams = new URLSearchParams(window.location.search);
  const userName = searchParams.get("name");
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const { isLoggedIn } = useAuth();

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (isLoggedIn) {
          const userName = localStorage.getItem("user_name");
          const profile = await getProfile(userName);
          setUserProfile(profile.data); // Store user profile data in state
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn]);

  // Function to handle opening the modal for a selected venue
  const handleVenueClick = (venueId) => {
    setSelectedVenueId(venueId);
    setIsModalOpen(true);
  };

  const handleUpdateVenueClick = (e, venueId) => {
    e.stopPropagation(); // Stop propagation
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

  const handleLikeButtonClick = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true; // For older versions of IE
    }
  };

  return (
    <div className="px-12">
      {/* Render the SearchBar component and pass the handleSearch function */}
      {/* No search bar in UsersVenues */}
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
                    <div className="absolute top-3 right-3">
                      {isLoggedIn &&
                        userProfile &&
                        userProfile.name === userName && (
                          <button
                            onClick={(e) => handleUpdateVenueClick(e, venue.id)}
                            className="text-sm py-2 px-4 bg-white text-black font-semibold rounded-xl transition duration-200 ease-in-out hover:bg-black hover:text-white"
                          >
                            Update Venue
                          </button>
                        )}
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      {!(
                        isLoggedIn &&
                        userProfile &&
                        userProfile.name === userName
                      ) && <LikeButton onClick={handleLikeButtonClick} />}
                    </div>
                  </div>

                  <div className="flex flex-col h-40 justify-between pt-3 pb-4 px-4">
                    <div className="flex flex-col">
                      <h1 className="md:text-xl font-semibold text-gray-700">
                        {venue.name.charAt(0).toUpperCase() +
                          venue.name.slice(1)}
                      </h1>
                      {/* Assuming description is available in venue object */}
                      <h2 className="text-sm md:text-base text-gray-500">
                        {venue.description}
                      </h2>
                    </div>
                    <div className="flex justify-between">
                      {/* Assuming price and rating are available in venue object */}
                      <div className="font-semibold text-gray-700">
                        ${venue.price.toFixed(0)}{" "}
                        <span className="text-sm text-gray-500 font-thin">
                          / per night
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <FaStar size={15} />

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
    </div>
  );
}

export default UsersVenues;
