import { useState, useEffect, useRef } from "react";
import SearchBar from "../components/nav/Searchbar";
import AllVenues from "../components/profile/AllVenues";
import useVenueSearch from "../hooks/useVenueSearch";
import Highlights from "../components/carousel/Highlights";
import Footer from "../components/nav/Footer";

const Home = () => {
  const { venues, searchVenues } = useVenueSearch();
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [guestNumber, setGuestNumber] = useState(0);
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("grid4");
  const [isSearchBarSticky, setIsSearchBarSticky] = useState(false);

  const allVenuesRef = useRef(null);
  const searchBarRef = useRef(null);

  const fetchData = async () => {
    try {
      await searchVenues({ guests: 0, searchText: "" });
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async ({ guests, searchText }) => {
    try {
      if (guests !== undefined && searchText !== undefined) {
        setSearchText(searchText);
        setGuestNumber(guests);
        setSearchClicked(true);
        await searchVenues({ guests, searchText });

        if (allVenuesRef.current) {
          const elementPosition =
            allVenuesRef.current.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset;
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

  useEffect(() => {
    const handleScroll = () => {
      if (searchBarRef.current) {
        const searchBarTop = searchBarRef.current.getBoundingClientRect().top;
        setIsSearchBarSticky(searchBarTop <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center relative">
        <div className="relative w-full md:h-[600px]">
          <img
            src="/assets/images/House.jpeg"
            alt="Background"
            className="w-full md:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-700 opacity-30"></div>
        </div>
        <div
          ref={searchBarRef}
          className={`w-full z-10 ${
            isSearchBarSticky ? "sticky top-0" : "md:absolute md:top-[550px]"
          }`}
        >
          <SearchBar
            onSearch={handleSearch}
            selectedLayout={selectedLayout}
            handleLayoutClick={handleLayoutClick}
          />
        </div>
        <div className="text-container w-full flex flex-col items-center gap-3 absolute top-20 md:top-48 left-[50%] transform translate-x-[-50%] -translate-y-[-50%] text-white z-10">
          <h1 className="with-shadow text-2xl md:text-6xl font-bold fade-in">
          Your Home Away from Home
          </h1>
          <p className="with-shadow md:text-lg fade-in">
            Find your perfect hideaway
          </p>
        </div>
        <Highlights onSearch={handleSearch} />
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
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
