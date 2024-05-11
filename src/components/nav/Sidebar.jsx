import { useState, useEffect, useContext, createContext, useRef } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { BsChatSquareText } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";
import { PiWarehouse } from "react-icons/pi";
import { TbHelpSquareRounded, TbSmartHome } from "react-icons/tb";
import PropTypes from "prop-types";
import { useAuth } from "../../context/auth/Auth";

const SidebarContext = createContext();

export default function Sidebar({ onHomeClick, onBookingsClick, onVenuesClick }) {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Home"); // New state to track active item
  const sidebarRef = useRef(null);

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
    <aside className="hidden xl:block fixed top-[450px] left-0 transform -translate-y-1/2" ref={sidebarRef}>
      <nav className="flex flex-col gap-4 border-2 rounded-tr-3xl rounded-br-3xl">
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-4 py-2 text-lg">
            <div>
              <SidebarItem
                icon={<TbSmartHome />}
                text="Home"
                isActive={activeItem === "Home"} // Pass isActive based on activeItem state
                onClick={() => {
                  onHomeClick();
                  setActiveItem("Home"); // Set activeItem to "Home" when clicked
                }}
              />

              <SidebarItem
                icon={<LuCalendarDays />}
                text="Bookings"
                isActive={activeItem === "Bookings"} // Pass isActive based on activeItem state
                onClick={() => {
                  onBookingsClick();
                  setActiveItem("Bookings"); // Set activeItem to "Bookings" when clicked
                }}
              />
              <SidebarItem
                icon={<PiWarehouse />}
                text="Venues"
                isActive={activeItem === "Venues"} // Pass isActive based on activeItem state
                onClick={() => {
                  onVenuesClick();
                  setActiveItem("Venues"); // Set activeItem to "Bookings" when clicked
                }}
              />

              <SidebarItem icon={<BsChatSquareText />} text="Messages" alert />

              <SidebarItem icon={<AiOutlineHeart />} text="Favorites" />
            </div>

            <div className="px-2 py-6">
              <div className="border-b-2 rounded-full"></div>
            </div>

            <div>
              <SidebarItem icon={<TbHelpSquareRounded />} text="Support" />
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

  SidebarItem.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isActive: PropTypes.bool, // Renamed from active to isActive
    alert: PropTypes.bool,
    onClick: PropTypes.func,
    bitcoinItem: PropTypes.bool,
  };

  const isLogout = text === "Logout";

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <li
      className={`
        relative flex items-center py-1 px-2 my-4 mx-1
        font-medium rounded-xl border-2 border-transparent cursor-pointer
        transition-colors group
        ${
          isActive // Use isActive to determine if the item is active
            ? "bg-gradient-to-b from-rose-400 to-rose-500 text-white"
            : "hover:bg-gray-100 hover:border-gray-50 text-gray-700 "
        }
        ${isLogout ? "text-rose-500" : ""}
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
          className={`absolute top-1 right-1 w-2 h-2 rounded bg-red-400 ${
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