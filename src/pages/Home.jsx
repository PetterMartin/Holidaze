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
  const [isSearchBarFixed, setIsSearchBarFixed] = useState(false);
  const searchBarRef = useRef(null);
  const [searchBarInitialTop, setSearchBarInitialTop] = useState(null);
  const allVenuesRef = useRef(null); // Add a ref for AllVenues

  useEffect(() => {
    fetchData();

    const handleScroll = () => {
      if (searchBarRef.current) {
        const searchBarTop = searchBarRef.current.getBoundingClientRect().top;
        if (!isSearchBarFixed && searchBarInitialTop === null) {
          setSearchBarInitialTop(searchBarRef.current.offsetTop);
        }
        setIsSearchBarFixed(searchBarTop <= 0);
        if (
          searchBarInitialTop !== null &&
          window.pageYOffset <= searchBarInitialTop
        ) {
          setIsSearchBarFixed(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSearchBarFixed, searchBarInitialTop]);

  const fetchData = async () => {
    try {
      await searchVenues({ guests: guestNumber, searchText });
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

      // Scroll to AllVenues section with an offset
      if (allVenuesRef.current) {
        allVenuesRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error searching venues:", error);
    }
  };

  const handleLayoutClick = (layout) => {
    setSelectedLayout(layout);
  };

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
        <div className="text-container w-full flex flex-col items-center gap-2 absolute top-20 md:top-48 left-[50%] transform translate-x-[-50%] -translate-y-[-50%] text-white z-10">
          <h1 className="with-shadow text-2xl md:text-6xl font-bold fade-in">
            Apartments for a day
          </h1>
          <p className="with-shadow md:text-lg fade-in">
            Find and choose the perfect home for you
          </p>
        </div>
        <div
          ref={searchBarRef}
          className={`md:absolute md:top-[540px] w-full z-20 ${
            isSearchBarFixed ? "fixed top-0 left-0" : ""
          }`}
        >
          <SearchBar
            onSearch={handleSearch}
            selectedLayout={selectedLayout}
            handleLayoutClick={handleLayoutClick}
          />
        </div>
        <Highlights onSearch={handleSearch} />
        <div className="mt-auto" ref={allVenuesRef}> {/* Add ref here */}
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
