import { useState, useEffect } from "react";
import SearchBar from "../components/header/Searchbar";
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
  const [showVenues, setShowVenues] = useState(false); // State to control showing UsersVenues

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

  return (
    <div className="flex flex-col items-center pe-8">
      <SearchBar onSearch={handleSearch} />
      <div className="flex">
        {isAuthenticated && (
          <div className="sticky top-0 h-full z-50">
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
          />
        )}
      </div>
    </div>
  );
};

export default Home;
