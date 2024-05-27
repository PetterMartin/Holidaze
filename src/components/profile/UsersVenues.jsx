import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/Auth";
import { getProfile } from "../../libs/api/Profiles";
import { fetchVenuesByProfile } from "../../libs/api/Venues";
import SingleVenueModal from "../modal/singlevenuemodal/SingleVenueModal";
import UpdateVenueModal from "../modal/UpdateVenueModal";
import LikeButton from "../buttons/LikeButton";
import SkeletonVenues from "./SkeletonVenues";

import { FaStar } from "react-icons/fa";

function UsersVenues({ userName }) {
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [status, setStatus] = useState("pending");
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUserVenues = async () => {
      try {
        if (userName) {
          setStatus("pending");
          const data = await fetchVenuesByProfile(userName);
          setVenues(data || []);
          setStatus("success");
        } else {
          console.warn("User name is not provided.");
          setStatus("error");
        }
      } catch (error) {
        console.error("Error fetching user venues:", error);
        setStatus("error");
      }
    };

    fetchUserVenues();
  }, [userName]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (isLoggedIn) {
          const profile = await getProfile(userName);
          const storedUserName = localStorage.getItem("user_name");
          if (profile.data.name === storedUserName) {
            setUserProfile(profile.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn, userName]);

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
    setVenues((prevVenues) =>
      prevVenues.map((venue) =>
        venue.id === updatedVenueData.id ? updatedVenueData : venue
      )
    );

    try {
      const data = await fetchVenuesByProfile(userName);
      setVenues(data || []);
    } catch (error) {
      console.error("Error refetching user venues:", error);
    }
  };

  const handleDeleteVenueSuccess = async () => {
    try {
      const updatedVenues = await fetchVenuesByProfile(userName);

      setVenues(updatedVenues || []);
    } catch (error) {
      console.error("Error updating venue list after deletion:", error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const handleLikeButtonClick = (e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    } else if (window.event) {
      window.event.cancelBubble = true; // For older versions of IE
    }
  };

  if (status === "pending") return <SkeletonVenues />;
  if (status === "error") return <div>Error loading venues.</div>;

  return (
    <main className="mt-16">
      <h1 className="text-3xl font-semibold mb-4 ms-1 text-gray-700">
        {userProfile && userProfile.name === userName
          ? "My Venues"
          : `${userName}'s Venues`}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {venues.map(
          (venue) =>
            venue.media &&
            venue.media.length > 0 && (
              <div
                key={venue.id}
                className="border border-gray-200 rounded-2xl cursor-pointer hover:shadow-lg transition duration-200 ease-in-out"
                onClick={() => handleVenueClick(venue.id)}
              >
                <div>
                  {userProfile && userProfile.name === userName ? (
                    <div className="relative">
                      <img
                        src={venue.media[0].url}
                        alt={venue.media[0].alt}
                        className="w-full h-48 object-cover rounded-t-2xl mb-1"
                      />
                      {userProfile && userProfile.name === userName && (
                        <div className="absolute top-4 right-4 z-10">
                          <button
                            onClick={(e) => handleUpdateVenueClick(e, venue.id)}
                            className="text-xs md:text-sm py-2 px-4 bg-white border-2 font-semibold rounded-xl transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-700 hover:text-white"
                          >
                            Update Venue
                          </button>
                        </div>
                      )}
                      <div className="absolute top-4 right-14 flex gap-2 items-center text-white py-2 px-3 rounded-full bg-opacity-70 backdrop-filter backdrop-blur-xl">
                        <FaStar size={15} />
                        <div className="mt-1 text-sm">{venue.rating}.0</div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={venue.media[0].url}
                        alt={venue.media[0].alt}
                        className="w-full h-48 object-cover rounded-2xl mb-1"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <LikeButton onClick={handleLikeButtonClick} />
                      </div>
                      <div className="absolute top-4 right-14 flex gap-2 items-center text-white py-2 px-3 rounded-full bg-opacity-70 backdrop-filter backdrop-blur-xl">
                        <FaStar size={15} />
                        <div className="mt-1 text-sm">{venue.rating}.0</div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col pt-3 px-4 pb-4">
                    <div className="flex flex-col gap-1">
                      <h1 className="font-semibold text-gray-700 max-w-56 overflow-hidden capitalize">
                        {venue.name}
                      </h1>
                      <div className="flex justify-between">
                        <h2 className="text-sm text-gray-500 max-w-64 overflow-hidden">
                          {venue.description}
                        </h2>
                        <div className="flex justify-between">
                          <div className="font-semibold text-gray-700">
                            ${venue.price.toFixed(0)}{" "}
                            <span className="text-sm text-gray-500 font-thin">
                              / per night
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
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
