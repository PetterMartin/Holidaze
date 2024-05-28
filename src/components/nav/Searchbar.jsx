import { useState, useEffect } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import SearchModal from "../modal/SearchModal";
import DateModal from "../modal/DateModal";
import GuestCounter from "../buttons/GuestCounter";

import { FaArrowRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { TfiLayoutGrid2Alt, TfiLayoutGrid4Alt } from "react-icons/tfi";


const SearchBar = ({
  onSearch,
  selectedLayout,
  handleLayoutClick,
  selectedDates,
}) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [guests, setGuests] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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

  useEffect(() => {
    defineElement(lottie.loadAnimation);
  }, []);

  return (
    <div className="flex justify-center w-full px-6 pb-2">
      {/* Venue Switch */}
      <div className="hidden mt-4">
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
      <div className="">
        <div className="flex gap-12 md:gap-0 justify-between items-center bg-white border-2 py-2 px-2 ps-8 rounded-full md:rounded-3xl mt-3">
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full">
            {/* Location section */}
            <div
              className="place-search flex items-center gap-4 md:gap-8 cursor-pointer"
              onClick={toggleSearchModal}
            >
              <lord-icon
                src="https://cdn.lordicon.com/kkvxgpti.json"
                trigger="hover"
                target=".place-search"
                style={{ width: 28, height: 28 }}
              ></lord-icon>
              <div className="flex flex-col">
                <p className="text-xs md:text-sm text-gray-400">
                  Where do you want to go?
                </p>
                <button className="flex items-center text-gray-600 text-sm md:text-base font-semibold max-w-[180px] truncate">
                  {searchText || "Search Destinations"}
                  <MdKeyboardArrowDown size={25} />
                </button>
              </div>
            </div>

            <div className="hidden md:block border border-gray-300 rounded-full mx-6"></div>

            {/* Dates section */}
            <div className="hidden lg:block">
              <div
                className="flex items-center gap-8 cursor-pointer mt-1 date-section"
                onClick={toggleDateModal}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/abfverha.json"
                  trigger="hover"
                  target=".date-section"
                  style={{ width: 28, height: 28 }}
                ></lord-icon>
                <div className="flex flex-col">
                  <p className="text-sm text-gray-400">
                    When do you want to go?
                  </p>
                  <button className="flex items-center text-gray-600 font-semibold max-w-[180px] truncate">
                    {"Add Dates"}
                    <MdKeyboardArrowDown size={25} />
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden md:block border border-gray-300 rounded-full mx-6"></div>

            {/* Guests section */}
            <div className="hidden md:block">
              <div className="flex items-center gap-6">
                <PiUsersThree size={28} />
                <div>
                  <p className="text-sm text-gray-400">How many will you be?</p>
                  <GuestCounter onGuestChange={setGuests} />
                </div>
              </div>
            </div>
          </div>

          {/* Search button */}
          <button
            className="hidden md:flex justify-center items-center gap-6 font-semibold bg-gradient-to-b from-rose-400 to-rose-500 text-white md:ms-8 ps-8 pe-4 py-3 rounded-xl relative"
            type="button"
            onClick={handleSearch}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Search
            <span
              className={`transition-transform duration-200 ease-in-out ${
                isHovered ? "translate-x-2" : "-translate-x-2"
              }`}
            >
              <FaArrowRight />
            </span>
          </button>

          {/* Search icon for mobile */}
          <button
            className="md:hidden flex justify-center items-center gap-6 font-semibold bg-gradient-to-b from-rose-400 to-rose-500 text-white p-3 rounded-full relative"
            type="button"
            onClick={handleSearch}
          >
            <FiSearch size={18} />
          </button>
        </div>
        {isSearchModalOpen && (
          <SearchModal
            onSearchTextChange={handleSearchTextChange}
            onClose={handleCloseModal}
          />
        )}
        <div className="flex justify-center">
          {isDateModalOpen && (
            <DateModal
              onSearchTextChange={handleSearchTextChange}
              onClose={handleCloseModal}
              selectedDates={selectedDates}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
