import { useState, createContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsChatSquareText } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";
import { PiWarehouse } from "react-icons/pi";
import { TbSmartHome } from "react-icons/tb";
import PropTypes from "prop-types";

const SidebarContext = createContext();

export default function MobileSidebar({
  onHomeClick,
  onBookingsClick,
  onVenuesClick,
}) {
  const [activeItem, setActiveItem] = useState("Home"); 

  return (
    <aside className="lg:hidden fixed bottom-0 left-0 z-20 bg-white w-full">
      <SidebarContext.Provider value={{}}>
        <ul className="flex justify-around py-4">
          <SidebarItem
            icon={<TbSmartHome />}
            isActive={activeItem === "Home"}
            onClick={() => {
              onHomeClick();
              setActiveItem("Home");
            }}
          />

          <SidebarItem
            icon={<LuCalendarDays />}
            isActive={activeItem === "Bookings"}
            onClick={() => {
              onBookingsClick();
              setActiveItem("Bookings");
            }}
          />
          <SidebarItem
            icon={<PiWarehouse />}
            isActive={activeItem === "Venues"}
            onClick={() => {
              onVenuesClick();
              setActiveItem("Venues");
            }}
          />

          <SidebarItem icon={<BsChatSquareText />} alert />

          <SidebarItem icon={<AiOutlineHeart />} />
        </ul>
      </SidebarContext.Provider>
    </aside>
  );
}

export function SidebarItem({ icon, isActive, alert, onClick }) {

  SidebarItem.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isActive: PropTypes.bool,
    alert: PropTypes.bool,
    onClick: PropTypes.func,
    bitcoinItem: PropTypes.bool,
  };

  return (
    <li
      className={`
        relative flex items-center flex-col py-2 px-2 mb-4
        font-medium rounded-xl border-2 border-transparent cursor-pointer
        transition-colors group
        ${
          isActive
            ? "bg-gradient-to-b from-rose-400 to-rose-500 text-white"
            : "hover:bg-gray-100 hover:border-gray-50 text-gray-700 "
        }
    `}
    style={{ fontSize: "20px" }}
      onClick={onClick}
    >
      {icon}
      {alert && (
        <div className="absolute top-1 right-1 w-2 h-2 rounded bg-cyan-400" />
      )}
    </li>
  );
}
