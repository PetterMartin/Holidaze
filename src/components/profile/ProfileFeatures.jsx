import { LuCalendarDays, LuUsers } from "react-icons/lu";
import { PiWarehouse } from "react-icons/pi";

const ProfileFeatures = ({ venuesCount, bookingsCount, guestsCount }) => {
  return (
    <div className="pt-6 pb-4 px-4 border-t">
      <div className="flex gap-12">
        <div className="flex flex-col items-center max-w-28">
          <div className="flex items-center justify-center bg-rose-50 rounded-full p-3 w-12 h-12">
            <PiWarehouse size={22} className="text-rose-600" />
          </div>
          <span className="md:text-lg font-semibold mt-1">{venuesCount}</span>
          <h1 className="text-xs md:text-base text-gray-500">Venues</h1>
        </div>
        <div className="flex flex-col items-center max-w-28">
          <div className="flex items-center justify-center bg-rose-50 rounded-full p-3 w-12 h-12">
            <LuCalendarDays size={22} className="text-rose-600" />
          </div>
          <span className="md:text-lg font-semibold mt-1">{bookingsCount}</span>
          <h1 className="text-xs md:text-base text-gray-500">Bookings</h1>
        </div>
        <div className="flex flex-col items-center max-w-28">
          <div className="flex items-center justify-center bg-rose-50 rounded-full p-3 w-12 h-12">
            <LuUsers size={22} className="text-rose-600" />
          </div>
          <span className="md:text-lg font-semibold mt-1">{guestsCount}</span>
          <h1 className="text-xs md:text-base text-gray-500">Guests</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileFeatures;
