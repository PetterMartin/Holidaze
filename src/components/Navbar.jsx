import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth/Auth.jsx";
import { getProfile } from "../libs/api/Profiles.js";

import RegisterModal from "./modal/RegisterModal";
import LoginModal from "./modal/LoginModal";
import CreateVenueModal from "./modal/CreateVenueModal";
import LogoutButton from "./buttons/LogoutButton.jsx";
import DefaultUserImage from "../../public/assets/images/defaultUser.png"; 

const Navbar = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateVenueModalOpen, setIsCreateVenueModalOpen] = useState(false); // Add state for CreateVenueModal
  const [userProfile, setUserProfile] = useState(null);
  const { isLoggedIn } = useAuth(); // Access isLoggedIn state from useAuth hook

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (isLoggedIn) {
          const userName = localStorage.getItem("user_name");
          const profile = await getProfile(userName);
          setUserProfile(profile.data); // Store user profile data in state
        } else {
          setUserProfile(null); // Reset user profile data when not logged in
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn]);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openCreateVenueModal = () => {
    setIsCreateVenueModalOpen(true);
  };

  const closeCreateVenueModal = () => {
    setIsCreateVenueModalOpen(false);
  };

  return (
    <div className="py-4 px-8">
      <nav className="flex justify-between items-center text-rose-500">
        <div className="flex gap-8">
          <Link to="/" className="text-xl font-bold hover:underline">
            Home
          </Link>
          <Link to="/venues" className="text-xl font-bold hover:underline">
            Venues
          </Link>
        </div>

        <button
          className="text-xl font-bold hover:underline"
          onClick={openCreateVenueModal}
        >
          Create Venue
        </button>

        <div className="flex gap-4 items-center">
          {isLoggedIn && userProfile ? (
            <>
              <img
                src={
                  userProfile.avatar.url ===
                  "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
                    ? DefaultUserImage
                    : userProfile.avatar.url
                }
                alt={userProfile.avatar.alt}
                className="w-12 h-12 rounded-full"
              />
              <Link to={`/profile?name=${userProfile.name}`} className="text-xl font-bold hover:underline">
                {userProfile.name}
              </Link>
            </>
          ) : isLoggedIn ? (
            <p>Loading...</p>
          ) : (
            <>
              <p
                className="cursor-pointer text-xl font-bold hover:underline"
                onClick={openLoginModal}
              >
                Login
              </p>
              <p
                className="cursor-pointer text-xl font-bold hover:underline"
                onClick={openRegisterModal}
              >
                Register
              </p>
            </>
          )}
          {isLoggedIn && <LogoutButton />}
        </div>
      </nav>

      {isRegisterModalOpen && (
        <RegisterModal
          isModalOpen={isRegisterModalOpen}
          setModalOpen={closeRegisterModal}
        />
      )}

      {isLoginModalOpen && (
        <LoginModal
          isModalOpen={isLoginModalOpen}
          setModalOpen={closeLoginModal}
        />
      )}

      {/* Render CreateVenueModal */}
      {isCreateVenueModalOpen && (
        <CreateVenueModal
          isModalOpen={isCreateVenueModalOpen}
          setModalOpen={closeCreateVenueModal}
        />
      )}
    </div>
  );
};

export default Navbar;
