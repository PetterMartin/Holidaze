import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/auth/Auth.jsx";
import { getProfile } from "../../libs/api/Profiles.js";

import RegisterModal from "../modal/RegisterModal.jsx";
import LoginModal from "../modal/LoginModal.jsx";
import CreateVenueModal from "../modal/CreateVenueModal.jsx";
import DefaultUserImage from "../../../public/assets/images/defaultUser.png";
import LogoutButton from "../buttons/LogoutButton.jsx";

import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateVenueModalOpen, setIsCreateVenueModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for toggling hamburger menu
  const { isLoggedIn } = useAuth();
  const menuRef = useRef(null);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        menuRef.current,
        { height: 0 },
        { height: "auto", duration: 0.3, ease: "power1.in" }
      );
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, [isMenuOpen]);

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
    <nav className="w-full">
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
              <div className="p-3 text-gray-700 bg-white rounded-full border-2">
                <RxHamburgerMenu size={18} />
              </div>
            </button>
          </div>

          {/* Dropdown Menu */}
          <div
            ref={menuRef}
            className={`absolute top-12 right-0 mt-2 overflow-hidden bg-white rounded-lg shadow-lg z-30 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="py-1">
              {isLoggedIn && (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <div className="border border-gray-100 mx-2"></div>
                  <div
                    className={`block px-4 py-3 text-gray-800 hover:bg-gray-200`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      openCreateVenueModal();
                    }}
                  >
                    Create Venue
                  </div>
                  <div className="border border-gray-100 mx-2"></div>
                  <LogoutButton />
                </>
              )}
              {!isLoggedIn && (
                <>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openLoginModal();
                    }}
                  >
                    Login
                  </button>
                  <div className="border border-gray-100 mx-2"></div>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => {
                      setIsMenuOpen(false);
                      openRegisterModal();
                    }}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>

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
