import SingleVenueModal from "../../components/modal/singlevenuemodal/SingleVenueModal";
import LikeButton from "../../components/buttons/LikeButton";
import LocationDetails from "../../components/modal/singlevenuemodal/LocationDetails";

import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";

const AllVenues = ({
  venues,
  selectedVenueId,
  setSelectedVenueId,
  isModalOpen,
  setIsModalOpen,
  searchText,
  guests,
  searchClicked,
  selectedLayout,
}) => {
  const numberOfVenues = venues.length;

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
    <div className="mx-auto lg:ps-28 px-6">
      <div className="flex justify-between mb-2 text-gray-700">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-semibold mb-4 ms-1">All Venues</h1>
          {searchClicked && (
            <p className="mb-3 text-sm text-gray-400">
              ({numberOfVenues} Results)
            </p>
          )}
        </div>

        {searchClicked && (
          <div className="flex gap-6 text-sm pe-4">
            <div className="flex items-center gap-2">
              <IoLocationOutline size={20} />
              <p>{searchText}</p>
            </div>
            <div className="flex items-center gap-2">
              <LuCalendarDays size={18} />
              <p>24-26 july</p>
            </div>

            <div className="flex items-center gap-2">
              <PiUsersThree size={20} />
              <p>{guests} guests</p>
            </div>
          </div>
        )}
      </div>

      <div
        className={`grid ${
          selectedLayout === "grid4"
            ? "md:grid-cols-2 lg:grid-cols-4"
            : "md:grid-cols-1 lg:grid-cols-2"
        } gap-6 lg:overflow-auto h-screen`}
      >
        {venues.map(
          (venue) =>
            venue.media &&
            venue.media.length > 0 && (
              <div
                key={venue.id}
                className="border rounded-2xl cursor-pointer hover:shadow-lg transition duration-200 ease-in-out"
                onClick={() => handleVenueClick(venue.id)}
              >
                <div>
                  <div className="relative">
                    <img
                      src={venue.media[0].url}
                      alt={venue.media[0].alt}
                      className={`w-full ${
                        selectedLayout === "grid2" ? "h-72" : "h-48"
                      } object-cover rounded-t-2xl mb-1`}
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <LikeButton onClick={handleLikeButtonClick} />
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 items-center text-white py-2 px-3 rounded-full bg-opacity-70 backdrop-filter backdrop-blur-xl">
                      <FaStar size={15} />
                      <div className="mt-1 text-xs">
                        {Number.isInteger(venue.rating)
                          ? `${venue.rating}.0`
                          : venue.rating}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex flex-col justify-between pt-2 pb-4 px-4 ${
                      selectedLayout === "grid2" ? "grid2-layout" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      <h1
                        className={`font-semibold text-gray-700 max-w-56 overflow-hidden capitalize ${
                          selectedLayout === "grid2" ? "text-lg" : ""
                        }`}
                      >
                        {venue.name}
                      </h1>
                      <div className="flex justify-between">
                        <h2
                          className={`text-sm text-gray-500 max-w-48 overflow-hidden overflow-ellipsis whitespace-nowrap ${
                            selectedLayout === "grid2" ? "text-base" : ""
                          }`}
                        >
                          <LocationDetails venue={venue} />
                        </h2>
                        <div className="font-semibold text-gray-700">
                          ${venue.price.toFixed(0)}{" "}
                          <span className="text-sm text-gray-500 font-thin">
                            / night
                          </span>
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
    </div>
  );
};

export default AllVenues;
