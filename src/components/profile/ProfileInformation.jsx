import { FaMedal } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { PiWarehouse } from "react-icons/pi";
import { RiShieldCheckFill } from "react-icons/ri";

const ProfileInformation = ({ userProfile, defaultUser }) => {
  return (
    <div className="flex flex-col  border p-4 rounded-xl">
      <div className="mx-auto flex">
        <div className="h-32 w-32 relative">
          <img
            src={
              userProfile.avatar.url ===
              "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
                ? defaultUser
                : userProfile.avatar.url
            }
            alt={userProfile.avatar.alt}
            className="object-cover w-full h-full rounded-3xl border-2"
          />
          <div className="absolute bottom-0 right-[-5px] text-white bg-rose-500 rounded-full p-1.5">
            <RiShieldCheckFill size={22} />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center gap-8 font-semibold">
            <h1 className="text-2xl">{userProfile.name}</h1>
            <p className="flex gap-2">
              <FaMedal className="mt-1" /> Superhost
            </p>
          </div>
          <div className="flex gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg">
              <div className="dot"></div>
              <div className="">Online</div>
            </div>
            <p className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg">
              {userProfile.email}
            </p>
          </div>
        </div>
      </div>

      <div className="flex item gap-16 my-6 px-2 py-4">
          <div className="flex flex-col items-center gap-2 max-w-28">
            <div className="flex items-center bg-rose-50 rounded-full p-3 w-12 h-12">
              <FaMedal size={28} className="text-rose-600" />
            </div>
            <h1 className="md:text-lg font-semibold">Superhost</h1>
          </div>
          <div className="flex flex-col items-center gap-2 max-w-28">
            <div className="flex items-center bg-rose-50 rounded-full p-3 w-12 h-12">
              <PiWarehouse size={22} className="text-rose-600" />
            </div>
            <h1 className="md:text-lg font-semibold">Venues</h1>
          </div>
          <div className="flex flex-col items-center gap-2 max-w-28">
            <div className="flex items-center bg-rose-50 rounded-full p-3 w-12 h-12">
              <LuCalendarDays size={25} className="text-rose-500" />
            </div>
            <h1 className="md:text-lg font-semibold">Bookings</h1>
          </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">About</h1>
        <p className="text-gray-500">{userProfile.bio}</p>
      </div>
    </div>
  );
};

export default ProfileInformation;
