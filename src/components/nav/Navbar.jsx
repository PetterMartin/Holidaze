import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/Auth.jsx";
import { getProfile } from "../../libs/api/Profiles.js";

import RegisterModal from "../modal/RegisterModal.jsx";
import LoginModal from "../modal/LoginModal.jsx";
import CreateVenueModal from "../modal/CreateVenueModal.jsx";
import DefaultUserImage from "../../../public/assets/images/defaultUser.png";

const Navbar = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateVenueModalOpen, setIsCreateVenueModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (isLoggedIn) {
          const userName = localStorage.getItem("user_name");
          const profile = await getProfile(userName);
          setUserProfile(profile.data);
        } else {
          setUserProfile(null);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavbarScrolled(true);
        setTransitioning(false);
      } else {
        setTransitioning(true);
        setTimeout(() => setIsNavbarScrolled(false), 10); // delay must match the transition duration in CSS
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar fixed top-0 left-0 w-full z-20 ${
        isCreateVenueModalOpen ? "fullscreen" : isNavbarScrolled ? "scrolled" : ""
      } ${transitioning && !isNavbarScrolled ? "removing" : ""}`}
    >
      <div className="py-4 px-8">
        <div className="flex justify-between items-center text-white relative">
          <div className="flex gap-8">
            <Link
              to="/"
              className={`with-shadow text-xl font-bold hover:underline ${
                location.pathname === "/dashboard" ? "text-rose-400" : "text-white"
              }`}
            >
              Holidaze
            </Link>
          </div>

          <div className="flex gap-4 font-bold">
            {isLoggedIn && ( // Only render if user is logged in
              <Link
                to="/dashboard"
                className={`font-bold hover:underline ${
                  location.pathname === "/dashboard"
                    ? "text-rose-400"
                    : "text-white with-shadow"
                }`}
              >
                Dashboard
              </Link>
            )}
            {isLoggedIn && ( // Only render if user is logged in
              <button
                className={`hover:underline ${
                  location.pathname === "/dashboard"
                    ? "text-rose-400 "
                    : "text-white with-shadow"
                }`}
                onClick={openCreateVenueModal}
              >
                Create Venue
              </button>
            )}
          </div>

          <div className="flex gap-4 items-center">
            {isLoggedIn && userProfile ? (
              <>
                <Link to="/dashboard">
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
          </div>
        </div>
      </div>
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

      {isCreateVenueModalOpen && (
        <CreateVenueModal
          isModalOpen={isCreateVenueModalOpen}
          setModalOpen={closeCreateVenueModal}
        />
      )}
    </nav>
  );
};

export default Navbar;
