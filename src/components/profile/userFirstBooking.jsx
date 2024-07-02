import { useEffect, useState } from "react";
import { getProfile } from "../../libs/api/Profiles";
import { fetchBookingsByProfile } from "../../libs/api/Bookings";
import SingleVenueModal from "../modal/singlevenuemodal/SingleVenueModal";

function UserFirstBooking({ userName }) {
  const [firstBooking, setFirstBooking] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);

  const handleVenueClick = async (venueId) => {
    setSelectedVenueId(venueId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getProfile(userName);
        setUserProfile(profile.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userName]);

  useEffect(() => {
    const fetchFirstBooking = async () => {
      try {
        if (userProfile) {
          const data = await fetchBookingsByProfile(userName);
          const sortedBookings = (data.data || []).sort(
            (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
          ); // Sort bookings by start date ascending
          const currentDate = new Date();
          const current = sortedBookings.find(
            (booking) => new Date(booking.dateFrom) >= currentDate
          ); // Find the first booking with a start date on or after the current date
          setFirstBooking(current);
        } else {
          console.warn("User profile not available.");
        }
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        // Handle error state here if necessary
      }
    };

    fetchFirstBooking();
  }, [userName, userProfile]);

  if (!firstBooking) {
    return <div>No Upcoming Bookings</div>;
  }

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const { venue, dateFrom, dateTo } = firstBooking;

  return (
    <div>
      {!firstBooking ? (
        <h1 className="text-xl font-semibold mb-8 text-gray-700">No upcoming Trip</h1>
      ) : (
        <div className="flex flex-col md:flex-row justify-between md:gap-16">
          <div className="flex flex-col pt-2 pb-4">
            <h1 className="text-xl font-semibold mb-8 text-gray-700">Next Trip</h1>
            <div className="flex flex-col justify-center gap-1">
              <h1 className="font-semibold text-2xl text-gray-700 max-w-56 overflow-hidden capitalize">
                {venue.name}
              </h1>
              <div className=" text-gray-500">
                {formatDate(dateFrom)} - {formatDate(dateTo)}
              </div>
            </div>
          </div>
          <div className="relative mt-2">
            <img
              src={venue.media.length > 0 ? venue.media[0].url : ""}
              alt={venue.media.length > 0 ? venue.media[0].alt : ""}
              className="w-full h-64 object-cover rounded-2xl cursor-pointer hover:shadow-lg transition duration-200 ease-in-out"
              onClick={() => handleVenueClick(venue.id)}
            />
          </div>
        </div>
      )}
      <SingleVenueModal
        isModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        venueId={selectedVenueId}
      />
    </div>
  );
}

export default UserFirstBooking;
