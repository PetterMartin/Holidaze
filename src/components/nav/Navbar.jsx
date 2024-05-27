import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth/Auth.jsx";
import { getProfile } from "../../libs/api/Profiles.js";

import RegisterModal from "../modal/RegisterModal.jsx";
import LoginModal from "../modal/LoginModal.jsx";
import CreateVenueModal from "../modal/CreateVenueModal.jsx";
import DefaultUserImage from "../../../public/assets/images/defaultUser.png";

import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateVenueModalOpen, setIsCreateVenueModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling hamburger menu
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
        isCreateVenueModalOpen
          ? "fullscreen"
          : isNavbarScrolled && !isMenuOpen && window.innerWidth > 768 // Check if menu is closed and screen width is above 768px
          ? "scrolled"
          : ""
      } ${transitioning && !isNavbarScrolled ? "removing" : ""}`}
    >
      <div className="py-4 px-8">
        <div className="flex justify-between items-center text-white relative">
          <div className="flex gap-8">
            <Link
              to="/"
              className={`with-shadow text-xl font-bold hover:underline ${
                location.pathname === "/dashboard"
                  ? "text-rose-400"
                  : "text-white"
              }`}
            >
              Holidaze
            </Link>
            {isLoggedIn && (
              <div className="hidden lg:flex">
                <Link
                  to="/dashboard"
                  className={` text-white ${
                    location.pathname === "/dashboard" ? "text-rose-400" : ""
                  }`}
                >
                  Dashboard
                </Link>
                <div className={` text-white`} onClick={openCreateVenueModal}>
                  Create Venue
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="block lg:hidden text-white"
            >
              {/* You can use any icon for the hamburger menu */}
              <div className="p-3 text-gray-700 bg-white rounded-full border-2">
                <RxHamburgerMenu size={18} />
              </div>
            </button>
          </div>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 bg-white mt-1 rounded-lg shadow-lg">
              <div className="py-1">
                {isLoggedIn && (
                  <>
                    <Link
                      to="/dashboard"
                      className={`block px-4 py-2 text-gray-800 hover:bg-gray-200 ${
                        location.pathname === "/dashboard"
                          ? "text-rose-400"
                          : ""
                      }`}
                    >
                      Dashboard
                    </Link>
                    <div
                      className={`block px-4 py-2 text-gray-800 hover:bg-gray-200`}
                      onClick={openCreateVenueModal}
                    >
                      Create Venue
                    </div>
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={openLoginModal}
                    >
                      Login
                    </button>
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={openRegisterModal}
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* User Profile Section */}
          <div className="hidden lg:flex items-center">
            {isLoggedIn && userProfile ? (
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
            ) : isLoggedIn ? (
              <p>Loading...</p>
            ) : (
              <>
                <p
                  className="with-shadow font-semibold hover:underline cursor-pointer"
                  onClick={openLoginModal}
                >
                  Login
                </p>
                <p
                  className="font-semibold bg-gradient-to-b from-rose-400 to-rose-500 text-white ms-6 px-8 py-2 rounded-lg cursor-pointer"
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
