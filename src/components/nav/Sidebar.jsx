import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useContext, createContext, useRef } from "react";
import PropTypes from "prop-types";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { useAuth } from "../../context/auth/Auth";

import { BiLogOutCircle } from "react-icons/bi";

const SidebarContext = createContext();

export default function Sidebar({
  onHomeClick,
  onBookingsClick,
  onVenuesClick,
}) {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const sidebarRef = useRef(null);

  useEffect(() => {
    defineElement(lottie.loadAnimation);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <aside className="hidden lg:block fixed" ref={sidebarRef}>
      <nav className="flex flex-col gap-4 border-2 rounded-tr-3xl rounded-br-3xl fixed top-[420px] left-0 transform -translate-y-1/2">
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-4 py-2 text-lg">
            <div>
              <SidebarItem
                icon={<LordIconVenues isActive={activeItem === "Home"} />}
                text="Dashboard"
                isActive={activeItem === "Home"}
                onClick={() => {
                  onHomeClick();
                  setActiveItem("Home");
                }}
              />

              <SidebarItem
                icon={<LordIconBooking isActive={activeItem === "Bookings"} />}
                text="Bookings"
                isActive={activeItem === "Bookings"} // Pass isActive based on activeItem state
                onClick={() => {
                  onBookingsClick();
                  setActiveItem("Bookings"); // Set activeItem to "Bookings" when clicked
                }}
              />
              <SidebarItem
                icon={<LordIconSmartHome isActive={activeItem === "Venues"} />}
                text="Venues"
                isActive={activeItem === "Venues"}
                onClick={() => {
                  onVenuesClick();
                  setActiveItem("Venues");
                }}
              />
              <SidebarItem icon={<LordIconGuest />} text="Guests" />

              <SidebarItem icon={<LordIconChat />} text="Messages" alert />

              <SidebarItem icon={<LordIconHeart />} text="Favorites" />
            </div>

            <div className="px-2 py-14">
              <div className="border-b-2 rounded-full"></div>
            </div>

            <div>
              <SidebarItem
                icon={<LordIconSupport isActive={activeItem === "Support"} />}
                text="Support"
              />
              <SidebarItem icon={<BiLogOutCircle />} text="Logout" />
            </div>
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, isActive, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const { logout } = useAuth();
  const navigate = useNavigate();

  SidebarItem.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isActive: PropTypes.bool,
    alert: PropTypes.bool,
    onClick: PropTypes.func,
    bitcoinItem: PropTypes.bool,
  };

  const isLogout = text === "Logout";

  const handleLogout = async () => {
    await logout(() => navigate({ to: "/" }));
  };

  return (
    <li
      className={`
      icon-group relative flex items-center py-1 px-2 my-4 mx-1
        font-medium rounded-xl border-2 border-transparent cursor-pointer
        transition-colors group
        ${
          isActive // Use isActive to determine if the item is active
            ? "bg-gradient-to-b from-rose-400 to-rose-500 text-white"
            : "hover:bg-gray-100 hover:border-gray-50 text-gray-700 "
        }
        ${isLogout ? "text-rose-500 hover:scale-110" : ""}
    `}
      style={{ fontSize: "20px" }}
      onClick={isLogout ? handleLogout : onClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-auto ml-3 text-lg" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute top-1 right-1 w-2 h-2 rounded bg-cyan-400 ${
            expanded ? "" : "top-1"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-lg px-4 py-2 ml-7
          bg-white text-gray-700 text-sm font-bold border-2
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-30
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

function LordIconSmartHome({ isActive }) {
  const colors = isActive ? "primary:#ffffff" : "";

  return (
    <lord-icon
      src="https://cdn.lordicon.com/cnpvyndp.json"
      trigger="hover"
      target=".icon-group"
      colors={colors}
      style={{
        width: 23,
        height: 23,
      }}
    ></lord-icon>
  );
}

function LordIconVenues({ isActive }) {
  const colors = isActive ? "primary:#ffffff" : "";

  return (
    <lord-icon
      src="https://cdn.lordicon.com/kthelypq.json"
      trigger="hover"
      target=".icon-group"
      colors={colors}
      style={{
        width: 23,
        height: 23,
      }}
    ></lord-icon>
  );
}

function LordIconBooking({ isActive }) {
  const colors = isActive ? "primary:#ffffff" : "";

  return (
    <lord-icon
      src="https://cdn.lordicon.com/abfverha.json"
      trigger="hover"
      target=".icon-group"
      colors={colors}
      style={{ width: 23, height: 23 }}
    ></lord-icon>
  );
}

function LordIconChat({ isActive }) {
  const colors = isActive ? "primary:#ffffff" : "";

  return (
    <lord-icon
      src="https://cdn.lordicon.com/fdxqrdfe.json"
      trigger="hover"
      target=".icon-group"
      colors={colors}
      style={{ width: 23, height: 23 }}
    ></lord-icon>
  );
}

function LordIconGuest({ isActive }) {
  const colors = isActive ? "primary:#ffffff" : "";

  return (
    <lord-icon
      src="https://cdn.lordicon.com/spukaklw.json"
      trigger="hover"
      target=".icon-group"
      colors={colors}
      style={{ width: 23, height: 23 }}
    ></lord-icon>
  );
}

function LordIconHeart({ isActive }) {
  const colors = isActive ? "primary:#ffffff" : "";

  return (
    <lord-icon
      src="https://cdn.lordicon.com/xyboiuok.json"
      trigger="hover"
      target=".icon-group"
      colors={colors}
      style={{ width: 23, height: 23 }}
    ></lord-icon>
  );
}

function LordIconSupport({ isActive }) {
  const colors = isActive ? "primary:#ffffff" : "";

  return (
    <lord-icon
      src="https://cdn.lordicon.com/axteoudt.json"
      trigger="hover"
      target=".icon-group"
      colors={colors}
      style={{ width: 23, height: 23 }}
    ></lord-icon>
  );
}
