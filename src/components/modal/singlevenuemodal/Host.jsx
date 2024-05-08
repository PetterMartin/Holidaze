import { Link } from "@tanstack/react-router";
import { RiShieldCheckFill } from "react-icons/ri";
import defaultUser from "../../../../public/assets/images/defaultUser.png";

const Host = ({ ownerProfile }) => {
    return (
      ownerProfile && (
        <div className="flex justify-between items-center pt-6 pb-12">
          <div className="flex flex-col gap-1">
            <div className="font-semibold flex flex-row items-center gap-3 relative">
              {/* Avatar image */}
              <img
                src={
                    ownerProfile.avatar.url ===
                    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
                      ? defaultUser
                      : ownerProfile.avatar.url
                  }
                alt={`${ownerProfile.name}'s Avatar`}
                className="w-16 h-16 object-cover rounded-full"
              />
              {/* Shield icon */}
              <div className="absolute bottom-0 left-10 text-white bg-rose-500 rounded-full p-1.5">
                <RiShieldCheckFill size={16} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg">Hosted by {ownerProfile.name}</h1>
                <div className="flex flex-row gap-1">
                  <div className="text-sm font-light text-gray-500">Joined in May 2024</div>
                </div>
              </div>
            </div>
          </div>
  
          <Link
            to={`/profile?name=${ownerProfile.name}`}
            className="listing-link"
          >
            <button className="rounded-2xl px-6 text-sm font-semibold border border-gray-700 h-12 hover:bg-gray-700 hover:text-white cursor-pointer transition duration-200 ease-in-out">
              Message Host
            </button>
          </Link>
        </div>
      )
    );
  };
  
  export default Host;
