import SingleVenueModal from "../../components/modal/singlevenuemodal/SingleVenueModal";
import LikeButton from "../../components/buttons/LikeButton";
import LocationDetails from "../../components/modal/singlevenuemodal/LocationDetails";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
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
}) => {
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
    <div className="mx-auto ps-28 pe-6">
      <div className="flex justify-between mb-2 text-gray-700">
        <h1 className="text-3xl font-semibold mb-4 ms-1">All Venues</h1>

        {searchClicked && (
          <div className="flex gap-4 text-sm pe-4">
            <div className="flex items-center gap-12 px-4 border-2 rounded-full cursor-pointer hover:border-gray-500 transition duration-300 ease-in-out">
              <div className="flex items-center gap-2">
                <IoLocationOutline size={20} />
                <p>{searchText}</p>
              </div>
              <MdKeyboardArrowDown size={20} />
            </div>
            <div className="flex items-center gap-12 px-4 border-2 rounded-full cursor-pointer hover:border-gray-500 transition duration-300 ease-in-out">
              <div className="flex items-center gap-2">
                <LuCalendarDays size={18} />
                <p>24-26 july</p>
              </div>
              <MdKeyboardArrowDown size={20} />
            </div>
            <div className="flex items-center gap-12 px-4 border-2 rounded-full cursor-pointer hover:border-gray-500 transition duration-300 ease-in-out">
              <div className="flex items-center gap-2">
                <PiUsersThree size={20} />
                <p>{guests} guests</p>
              </div>
              <MdKeyboardArrowDown size={20} />
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto h-screen">
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
                  <div className="relative">
                    <img
                      src={venue.media[0].url}
                      alt={venue.media[0].alt}
                      className="w-full h-64 object-cover rounded-2xl mb-1"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <LikeButton onClick={handleLikeButtonClick} />
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2 items-center text-white py-2 px-3 rounded-full bg-opacity-70 backdrop-filter backdrop-blur-xl">
                      <FaStar size={15} />
                      <div className="mt-1 text-sm">
                        {Number.isInteger(venue.rating)
                          ? `${venue.rating}.0`
                          : venue.rating}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between pt-3 pb-4 px-4">
                    <div className="flex flex-col gap-1">
                      <h1 className="font-semibold text-gray-700 max-w-56 overflow-hidden capitalize">
                        {venue.name}
                      </h1>
                      <div className="flex justify-between">
                        <h2 className="text-sm text-gray-500 max-w-64 overflow-hidden">
                          <LocationDetails venue={venue} />
                        </h2>
                        <div className="flex justify-between">
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
