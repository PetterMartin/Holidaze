import { useState, useEffect } from "react";
import SearchBar from "../components/nav/Searchbar";
import AllVenues from "../components/profile/AllVenues";
import useVenueSearch from "../hooks/useVenueSearch";

const Home = () => {
  const { venues, searchVenues } = useVenueSearch();
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [guestNumber, setGuestNumber] = useState(0);
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("grid4");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await searchVenues({ guests: 0, searchText: "" });
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleSearch = async ({ guests, searchText }) => {
    try {
      setSearchText(searchText);
      setGuestNumber(guests);
      setSearchClicked(true);
      await searchVenues({ guests, searchText });
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };

  const handleLayoutClick = (layout) => {
    setSelectedLayout(layout);
  };

  return (
    <div className="flex flex-col items-center relative">
      <img
        src="/assets/images/House.jpeg"
        alt="Background"
        className="w-full h-[450px] object-cover"
      />
      <div className="absolute inset-0">
        <div className="bg-gray-700 opacity-30 h-[450px]"></div>
      </div>
      <div className="text-container flex flex-col items-center gap-2 absolute top-36 left-[50%] transform translate-x-[-50%] -translate-y-[-50%] text-white z-40">
        <h1 className="with-shadow text-6xl font-bold">Apartments for a day</h1>
        <p className="text-lg">Find and choose the perfect home for you</p>
      </div>
      <div className="absolute top-[390px] w-full z-40">
        <SearchBar
          onSearch={handleSearch}
          selectedLayout={selectedLayout}
          handleLayoutClick={handleLayoutClick}
        />
      </div>
      <div className="mt-auto">
        <AllVenues
          venues={venues}
          selectedVenueId={selectedVenueId}
          setSelectedVenueId={setSelectedVenueId}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          searchText={searchText}
          guests={guestNumber}
          searchClicked={searchClicked}
          selectedLayout={selectedLayout}
        />
      </div>
    </div>
  );
};

export default Home;
