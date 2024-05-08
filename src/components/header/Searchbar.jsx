import { useState } from "react";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import { BsFillCalendarMinusFill } from "react-icons/bs";
import { MdLocationOn, MdKeyboardArrowDown } from "react-icons/md";
import SearchModal from "../modal/SearchModal";
import DateModal from "../modal/DateModal";
import GuestCounter from "../buttons/GuestCounter";

const SearchBar = ({ onSearch }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [guests, setGuests] = useState(0);

  const handleSearch = () => {
    onSearch({ guests, searchText });
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen((prev) => !prev);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
  };

  const toggleDateModal = () => {
    setIsDateModalOpen((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsSearchModalOpen(false);
    setIsDateModalOpen(false);
  };

  return (
    <div className="flex flex-col w-3/4 mb-10">
      <div className="flex justify-between items-center bg-white border-2 py-2 px-2 ps-8 rounded-full mt-6">
        <div className="flex justify-between w-full">
          {/* Location section */}
          <div
            className="flex items-center gap-8 cursor-pointer"
            onClick={toggleSearchModal}
          >
            <MdLocationOn size={25} />
            <div className="flex flex-col">
              <p className="text-sm text-gray-400">Where do you want to go?</p>
              <button className="flex items-center text-gray-600 font-semibold max-w-[180px] truncate">
                {searchText || "Search Destinations"}
                <MdKeyboardArrowDown size={25} />
              </button>
            </div>
          </div>

          <div className="border border-gray-300 rounded-full"></div>

          {/* Guests section */}
          <div className="hidden lg:block">
            <div
              className="flex items-center gap-8 cursor-pointer"
              onClick={toggleDateModal}
            >
              <BsFillCalendarMinusFill size={20} />
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">Date</p>
                <button className="flex items-center text-gray-600 font-semibold max-w-[180px] truncate">
                  {searchText || "Add Dates"}
                  <MdKeyboardArrowDown size={25} />
                </button>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-full"></div>

          {/* Guest section */}
          <div className="flex items-center gap-6">
            <FaUsers size={25} />
            <GuestCounter onGuestChange={setGuests} />
          </div>
        </div>

        {/* Search button */}
        <button
          className="flex justify-center items-center gap-6 ms-16 font-semibold bg-gradient-to-b from-rose-400 to-rose-500 text-white ps-8 pe-4 py-4 rounded-full transition duration-200 ease-in-out hover:opacity-80"
          onClick={handleSearch}
        >
          Search
          <FaArrowRight />
        </button>
      </div>
      {isSearchModalOpen && (
        <SearchModal
          onSearchTextChange={handleSearchTextChange}
          onClose={handleCloseModal}
        />
      )}
      <div className="flex justify-center">
        {isDateModalOpen && <DateModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default SearchBar;
