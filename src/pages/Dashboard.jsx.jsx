import { useState, useEffect } from "react";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import Sidebar from "../components/nav/Sidebar";
import UsersBookings from "../components/profile/UsersBookings";
import UsersVenues from "../components/profile/UsersVenues";
import useFetchUserProfile from "../hooks/useFetchUserProfile";
import MobileSidebar from "../components/nav/MobileSidebar";
import ProfilePage from "../components/profile/ProfilePage";

const Dashboard = () => {
  const userId = localStorage.getItem("user_name");
  const { userProfile, isProfileLoading } = useFetchUserProfile(userId);
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showVenues, setShowVenues] = useState(false);

  useEffect(() => {
    if (!isProfileLoading && userProfile) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isProfileLoading, userProfile]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  useEffect(() => {
    defineElement(lottie.loadAnimation);
  }, []);

  const onHomeClick = () => {
    setShowBookings(false);
    setShowVenues(false); 
  };

  const onVenuesClick = () => {
    setShowBookings(false);
    setShowVenues(true); 
  };

  return (
    <div className="flex flex-col items-center">
      <MobileSidebar
        onVenuesClick={onVenuesClick}
        onBookingsClick={() => setShowBookings(true)}
        onHomeClick={onHomeClick}
      />
      <div className="mx-auto lg:ps-28 px-6">
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
          <UsersBookings
            userName={userId}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            selectedVenueId={selectedVenueId}
            setSelectedVenueId={setSelectedVenueId}
          />
        ) : showVenues ? (
          <UsersVenues userName={userId} />
        ) : (
          <ProfilePage />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
