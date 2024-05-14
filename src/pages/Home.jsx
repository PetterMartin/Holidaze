import { useState, useEffect } from "react";
import SearchBar from "../components/nav/Searchbar";
import Sidebar from "../components/nav/Sidebar";
import AllVenues from "../components/profile/AllVenues";
import useVenueSearch from "../hooks/useVenueSearch";
import UsersBookings from "../components/profile/UsersBookings";
import UsersVenues from "../components/profile/UsersVenues";
import useFetchUserProfile from "../hooks/useFetchUserProfile";

const Home = () => {
  const userId = localStorage.getItem("user_name");
  const { userProfile, isProfileLoading } = useFetchUserProfile(userId);
  const { venues, searchVenues } = useVenueSearch();
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAllVenues, setShowAllVenues] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showVenues, setShowVenues] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [guestNumber, setGuestNumber] = useState(0);
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("grid4"); 

  useEffect(() => {
    if (!isProfileLoading && userProfile) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isProfileLoading, userProfile]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

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
  

  const onHomeClick = () => {
    setShowBookings(false); // Set showBookings to false to hide UsersBookings
    setShowVenues(false); // Set showVenues to false to hide UsersVenues
  };

  const onVenuesClick = () => {
    setShowAllVenues(true); // Set showAllVenues to true when clicking on Venues in the Sidebar
    setShowBookings(false); // Set showBookings to false to hide UsersBookings
    setShowVenues(true); // Set showVenues to true to show UsersVenues
  };

  const handleLayoutClick = (layout) => {
    setSelectedLayout(layout);
  };


  return (
    <div className="flex flex-col items-center">
      <SearchBar onSearch={handleSearch} selectedLayout={selectedLayout} handleLayoutClick={handleLayoutClick} />
      <div className="flex">
        {isAuthenticated && (
          <div className="sticky top-0 h-full z-20">
            <Sidebar
              onVenuesClick={onVenuesClick}
              onBookingsClick={() => setShowBookings(true)}
              onHomeClick={onHomeClick}
            />
          </div>
        )}
        {showBookings ? (
          <UsersBookings userName={userId} />
        ) : showVenues ? (
          <UsersVenues userName={userId} />
        ) : (
          <AllVenues
            venues={venues}
            selectedVenueId={selectedVenueId}
            setSelectedVenueId={setSelectedVenueId}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            showAllVenues={showAllVenues}
            searchText={searchText}
            guests={guestNumber}
            searchClicked={searchClicked}
            selectedLayout={selectedLayout}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
