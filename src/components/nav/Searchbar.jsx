import { useState } from "react";
import SearchModal from "../modal/SearchModal";
import DateModal from "../modal/DateModal";
import GuestCounter from "../buttons/GuestCounter";

import { FaArrowRight } from "react-icons/fa";
import { IoFilter, IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { TfiLayoutGrid2Alt, TfiLayoutGrid4Alt } from "react-icons/tfi";

const SearchBar = ({ onSearch, selectedLayout, handleLayoutClick }) => {
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
    <div className="flex justify-between w-full px-6 pb-2">
      {/* Venue Switch */}
      <div className="hidden lg:flex items-center mt-4">
        <div className="flex items-center rounded-xl cursor-pointer">
          <div
            className={`p-4 text-${
              selectedLayout === "grid4" ? "white" : "gray-500"
            } rounded-lg ${selectedLayout === "grid4" ? "bg-gray-700" : ""}`}
            onClick={() => handleLayoutClick("grid4")}
          >
            <TfiLayoutGrid4Alt size={20} />
          </div>
          <div
            className={`p-4 text-${
              selectedLayout === "grid2" ? "white" : "gray-500"
            } rounded-lg ${selectedLayout === "grid2" ? "bg-gray-700" : ""}`}
            onClick={() => handleLayoutClick("grid2")}
          >
            <TfiLayoutGrid2Alt size={18} />
          </div>
        </div>
      </div>

      {/* Searchbar */}
      <div className="flex flex-col lg:ms-12">
        <div className="flex justify-between items-center bg-white border-2 py-2 px-2 ps-8 rounded-3xl mt-6">
          <div className="flex w-full">
            {/* Location section */}
            <div
              className="flex items-center gap-8 cursor-pointer"
              onClick={toggleSearchModal}
            >
              <IoLocationOutline size={25} />
              <div className="flex flex-col">
                <p className="text-sm text-gray-400">
                  Where do you want to go?
                </p>
                <button className="flex items-center text-gray-600 font-semibold max-w-[180px] truncate">
                  {searchText || "Search Destinations"}
                  <MdKeyboardArrowDown size={25} />
                </button>
              </div>
            </div>

            <div className="border border-gray-300 rounded-full mx-6"></div>

            {/* Guests section */}
            <div className="hidden lg:block">
              <div
                className="flex items-center gap-8 cursor-pointer mt-1"
                onClick={toggleDateModal}
              >
                <LuCalendarDays size={22} />
                <div className="flex flex-col">
                  <p className="text-sm text-gray-400">Date</p>
                  <button className="flex items-center text-gray-600 font-semibold max-w-[180px] truncate">
                    {"Add Dates"}
                    <MdKeyboardArrowDown size={25} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-300 rounded-full mx-6"></div>

            {/* Guest section */}
            <div className="flex items-center gap-6">
              <PiUsersThree size={28} />
              <GuestCounter onGuestChange={setGuests} />
            </div>
          </div>

          {/* Search button */}
          <button
            className="flex justify-center items-center gap-6 ms-12 font-semibold bg-gradient-to-b from-rose-400 to-rose-500 text-white ps-8 pe-4 py-3 rounded-xl transition duration-200 ease-in-out hover:opacity-80"
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

      {/* Filter */}
      <div className="flex items-center">
        <button className="flex items-center gap-3 mt-4 border-2 px-5 py-4 rounded-xl text-sm font-semibold hover:border-rose-400 transition duration-300 ease-in-out">
          {" "}
          <IoFilter />
          Filters
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
