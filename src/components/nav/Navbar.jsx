import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/auth/Auth.jsx";
import { getProfile } from "../../libs/api/Profiles.js";

import RegisterModal from "../modal/RegisterModal.jsx";
import LoginModal from "../modal/LoginModal.jsx";
import CreateVenueModal from "../modal/CreateVenueModal.jsx";
import DefaultUserImage from "../../../public/assets/images/defaultUser.png";
import LogoutButton from "../buttons/LogoutButton.jsx";

import { RxHamburgerMenu } from "react-icons/rx";
import { SiGooglehome } from "react-icons/si";

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
    defineElement(lottie.loadAnimation);
  }, []);

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
    <nav className="w-full shadow-sm">
      <div className="py-1 px-8">
        <div className="flex justify-between items-center text-gray-700 relative">
          <div className="flex gap-8">
            <div className="flex items-center gap-4">
            <Link
                to="/"
                className="flex gap-2 font-semibold mt-1 items-center"
              >
                <SiGooglehome
                  size={22}
                  className="text-rose-500/90 googlehome-icon"
                  style={{ transition: "transform 0.5s" }}
                />
                <span className="mt-0.5 text-xl">Holidaze</span>
              </Link>

              <div className="hidden lg:block">
                <div className="flex gap-4 items-center px-4 border-s border-e">
                  <div className="phone flex gap-2 items-center text-sm">
                    <lord-icon
                      src="https://cdn.lordicon.com/rsvfayfn.json"
                      trigger="hover"
                      target=".phone"
                      style={{ width: 22, height: 22 }}
                    ></lord-icon>
                    (+47)875-462-0127
                  </div>
                  <div className="email flex gap-2 items-center text-sm border-s ps-4">
                    <lord-icon
                      src="https://cdn.lordicon.com/nzixoeyk.json"
                      trigger="hover"
                      target=".email"
                      style={{ width: 22, height: 22 }}
                    ></lord-icon>
                    holidaze@example.com
                  </div>
                </div>
              </div>
            </div>
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
                    className="flex items-center justify-between px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                    <lord-icon
                      src="https://cdn.lordicon.com/kthelypq.json"
                      trigger="hover"
                      style={{ width: 22, height: 22 }}
                    ></lord-icon>
                  </Link>
                  <div className="border border-gray-100 mx-2"></div>
                  <div
                    className={`flex items-center justify-between gap-4 px-4 py-3 text-gray-800 hover:bg-gray-200`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      openCreateVenueModal();
                    }}
                  >
                    Host a venue
                    <lord-icon
                      src="https://cdn.lordicon.com/cnpvyndp.json"
                      trigger="hover"
                      style={{ width: 22, height: 22 }}
                    ></lord-icon>
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
              <div className="flex items-center gap-4">
                <div className="flex gap-4 px-4 border-s border-e text-sm">
                  <Link
                    to="/dashboard"
                    className="person flex items-center gap-2"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/kthelypq.json"
                      trigger="hover"
                      target=".person"
                      style={{ width: 22, height: 22 }}
                    ></lord-icon>
                    Dashboard
                  </Link>
                  <div
                    className="house flex items-center gap-2 border-s ps-4 cursor-pointer"
                    onClick={openCreateVenueModal}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/cnpvyndp.json"
                      trigger="hover"
                      target=".house"
                      style={{ width: 22, height: 22 }}
                    ></lord-icon>
                    Host a venue
                  </div>
                </div>
                <Link to="/dashboard">
                  <img
                    src={
                      userProfile.avatar.url ===
                      "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
                        ? DefaultUserImage
                        : userProfile.avatar.url
                    }
                    alt={userProfile.avatar.alt}
                    className="w-12 h-12 rounded-full border-2 hover:border-rose-400 hover:scale-110 transition"
                  />
                </Link>
              </div>
            ) : isLoggedIn ? (
              <p>Loading...</p>
            ) : (
              <>
                <p
                  className=" hover:underline cursor-pointer"
                  onClick={openLoginModal}
                >
                  Login
                </p>
                <p
                  className="font-semibold bg-gradient-to-b from-rose-400 to-rose-500 text-white ms-6 px-8 py-2 rounded-lg cursor-pointer transition duration-200 ease-in-out hover:opacity-85"
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
