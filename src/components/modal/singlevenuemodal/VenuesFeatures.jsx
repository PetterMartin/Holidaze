import { CiWifiOn, CiWifiOff } from "react-icons/ci";
import { LuParkingCircle, LuParkingCircleOff } from "react-icons/lu";
import { TbCoffee, TbCoffeeOff, TbPaw, TbPawOff } from "react-icons/tb";

const VenuesFeatures = ({ venue }) => {
  return (
    <div className="py-6 px-4 border-b">
      <div className="flex gap-6 md:gap-12">
        {venue.meta.wifi ? (
          <div className="flex flex-col gap-2 max-w-28">
            <div className="flex items-center bg-rose-50 rounded-full p-3 w-10 h-10 sm:w-12 sm:h-12">
              <CiWifiOn size={28} className="text-rose-600" />
            </div>
            <h1 className="text-sm md:text-lg font-semibold">Wi-fi</h1>
            <p className="text-xs md:text-base text-gray-500">
              Free internet access
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-w-28">
            <div className="flex items-center bg-gray-100 rounded-full p-3 w-10 h-10 sm:w-12 sm:h-12">
              <CiWifiOff size={28} className="text-gray-400" />
            </div>
            <h1 className="text-sm md:text-lg font-semibold">No Wi-fi</h1>
            <p className="text-xs md:text-base text-gray-500">
              Wi-fi not available
            </p>
          </div>
        )}
        {venue.meta.pets ? (
          <div className="flex flex-col gap-2 max-w-28">
            <div className="flex items-center bg-rose-50 rounded-full p-3 w-10 h-10 sm:w-12 sm:h-12">
              <TbPaw size={22} className="text-rose-600" />
            </div>
            <h1 className="text-sm md:text-lg font-semibold">Pets</h1>
            <p className="text-xs md:text-base text-gray-500">
              Bring your pets on the trip
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-w-28">
            <div className="flex items-center bg-gray-100 rounded-full p-3 w-10 h-10 sm:w-12 sm:h-12">
              <TbPawOff size={22} className="text-gray-400" />
            </div>
            <h1 className="text-sm md:text-lg font-semibold">No Pets</h1>
            <p className="text-xs md:text-base text-gray-500">
              Pets not allowed
            </p>
          </div>
        )}
        {venue.meta.breakfast ? (
          <div className="flex flex-col gap-2 max-w-28">
            <div className="flex items-center bg-rose-50 rounded-full p-3 w-10 h-10 sm:w-12 sm:h-12">
              <TbCoffee size={25} className="text-rose-500" />
            </div>
            <h1 className="text-sm md:text-lg font-semibold">Breakfast</h1>
            <p className="text-xs md:text-base text-gray-500">
              Breakfast included
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-w-28">
            <div className="flex items-center bg-gray-100 rounded-full p-3 w-10 h-10 sm:w-12 sm:h-12">
              <TbCoffeeOff size={20} className="text-gray-400" />
            </div>

            <h1 className="text-sm md:text-lg font-semibold">No Breakfast</h1>
            <p className="text-xs md:text-base text-gray-500">
              No breakfast included
            </p>
          </div>
        )}
        {venue.meta.parking ? (
          <div className="flex flex-col gap-2 max-w-28">
            <div className="flex items-center bg-rose-50 rounded-full p-3 w-10 h-10 sm:w-12 sm:h-12">
              <LuParkingCircle size={20} className="text-rose-600" />
            </div>
            <h1 className="text-sm md:text-lg font-semibold">Parking</h1>
            <p className="text-xs md:text-base text-gray-500">
              Parking space outside
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-w-28">
            <div className="flex items-center bg-gray-100 rounded-full p-3 w-10 h-10 sm:w-12 sm:h-12">
              <LuParkingCircleOff size={20} className="text-gray-400" />
            </div>
            <h1 className="text-sm md:text-lg font-semibold">No Parking</h1>
            <p className="text-xs md:text-base text-gray-500">
              No parking available
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenuesFeatures;
