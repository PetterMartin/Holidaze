import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/Auth";
import { fetchBookingsByProfile } from "../../libs/api/Bookings";
import SingleVenueModal from "../../components/modal/singlevenuemodal/SingleVenueModal";

function UsersBookings({
  userName,
  isModalOpen,
  setIsModalOpen,
  selectedVenueId,
  setSelectedVenueId,
}) {
  const [currentBookings, setCurrentBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        if (userName && user) {
          const data = await fetchBookingsByProfile(userName);
          const sortedBookings = (data.data || []).sort((a, b) => new Date(b.dateTo) - new Date(a.dateTo));
          const currentDate = new Date();
          const current = [];
          const previous = [];
          sortedBookings.forEach(booking => {
            if (new Date(booking.dateTo) >= currentDate) {
              current.push(booking);
            } else {
              previous.push(booking);
            }
          });
          setCurrentBookings(current);
          setPreviousBookings(previous);
        } else {
          console.warn("User is not logged in.");
        }
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };
  
    fetchUserBookings();
  }, [userName, user]);

  const handleVenueClick = (venueId) => {
    setSelectedVenueId(venueId);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderBookings = (bookings, isPrevious = false) => {
    return bookings.map(({ id, dateFrom, dateTo, guests, venue }) => (
      <div
        key={id}
        className={`border rounded-2xl cursor-pointer hover:shadow-lg transition duration-200 ease-in-out ${
          isPrevious ? "filter grayscale" : ""
        }`}
        onClick={() => handleVenueClick(venue.id)}
      >
        <div>
          <div className="relative">
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt}
              className="w-full h-48 object-cover rounded-t-2xl mb-1"
            />
          </div>
          <div className="flex flex-col justify-between pt-2 pb-4 px-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-gray-700 max-w-56 overflow-hidden capitalize">
                {venue.name}
              </h1>
              <div className="flex justify-between">
                <div className="font-semibold text-gray-700">
                  {formatDate(dateFrom)} - {formatDate(dateTo)}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Guests: {guests}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="mx-auto lg:ps-28 px-6">
      <h1 className="text-3xl font-semibold mb-6 ms-1">My Bookings</h1>
      <div className="h-screen">
        {currentBookings.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Current Bookings</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:overflow-auto">
              {renderBookings(currentBookings)}
            </div>
          </div>
        )}
        {previousBookings.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold my-4">Previous Bookings</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:overflow-auto">
              {renderBookings(previousBookings, true)}
            </div>
          </div>
        )}
      </div>
      <SingleVenueModal
        isModalOpen={isModalOpen}
        setModalOpen={setIsModalOpen}
        venueId={selectedVenueId}
      />
    </div>
  );
}

export default UsersBookings;
