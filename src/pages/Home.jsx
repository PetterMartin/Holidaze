import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/nav/Searchbar";
import AllVenues from "../components/profile/AllVenues";
import useVenueSearch from "../hooks/useVenueSearch";
import Highlights from "../components/carousel/Highlights";

const Home = () => {
  const { venues, searchVenues, fetchMoreVenues } = useVenueSearch();
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [guestNumber, setGuestNumber] = useState(0);
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("grid4");
  const [page, setPage] = useState(1);

  const allVenuesRef = useRef(null);

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
      if (guests !== undefined && searchText !== undefined) {
        setSearchText(searchText);
        setGuestNumber(guests);
        setSearchClicked(true);
        setPage(1);  // Reset to first page on new search
        await searchVenues({ guests, searchText, page: 1 });

        // Scroll to AllVenues section with an offset
        if (allVenuesRef.current) {
          const offset = -100;  // Adjust this value to set how much higher you want to scroll to
          const elementPosition = allVenuesRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset + offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else {
        console.error("Error: Guests or searchText is undefined.");
      }
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };

  const handleLayoutClick = (layout) => {
    setSelectedLayout(layout);
  };

  const handleSeeMore = async () => {
    try {
      const nextPage = page + 1;
      await fetchMoreVenues({ guests: guestNumber, searchText, page: nextPage });
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more venues:", error);
    }
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
      <div className="text-container flex flex-col items-center gap-2 absolute top-36 left-[50%] transform translate-x-[-50%] -translate-y-[-50%] text-white z-10">
        <h1 className="with-shadow text-6xl font-bold">Apartments for a day</h1>
        <p className="text-lg">Find and choose the perfect home for you</p>
      </div>
      <div className="absolute top-[390px] w-full z-10">
        <SearchBar
          onSearch={handleSearch}
          selectedLayout={selectedLayout}
          handleLayoutClick={handleLayoutClick}
        />
      </div>
      <Highlights searchText={searchText} onSearch={handleSearch}/>
      <div className="mt-auto" ref={allVenuesRef}>
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
          onSeeMore={handleSeeMore}  // Pass see more handler
        />
      </div>
    </div>
  );
};

export default Home;
