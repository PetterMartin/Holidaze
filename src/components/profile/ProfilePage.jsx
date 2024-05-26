import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/Auth";
import { getProfile, updateProfile } from "../../libs/api/Profiles";
import defaultUser from "../../../public/assets/images/defaultUser.png";
import Banner from "./Banner";
import ProfileInformation from "./ProfileInformation";
import UsersFirstBooking from "./userFirstBooking";

import { AiOutlineEdit } from "react-icons/ai";
import { RiShieldCheckFill } from "react-icons/ri";

export default function ProfilePage() {
  const { user: authUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userName = localStorage.getItem("user_name");
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [newBannerUrl, setNewBannerUrl] = useState("");
  const [newBio, setNewBio] = useState(""); // New bio state
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [venuesCount, setVenuesCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [guestsCount, setGuestsCount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem("jwt");

        if (userName && storedToken) {
          try {
            const profileResponse = await getProfile(userName, storedToken);
            const profileData = profileResponse.data;

            setUserProfile(profileData);
            setIsVenueManager(profileData.venueManager || false);
            setIsAuthenticated(true);

            // Set counts from profile data
            setVenuesCount(profileData._count?.venues || 0);
            setBookingsCount(profileData._count?.bookings || 0);
            // If there's a count for guests, update the state accordingly
            // setGuestsCount(profileData._count?.guests || 0); // Assuming guests count is available in the API
          } catch (error) {
            console.error("Error fetching user profile:", error.message);
          } finally {
            setIsProfileLoading(false);
          }
        } else {
          setIsAuthenticated(false);
          setIsProfileLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [userName, isAuthenticated]);

  const handleAvatarUrlChange = (event) => {
    setNewAvatarUrl(event.target.value);
  };

  const handleBannerUrlChange = (event) => {
    setNewBannerUrl(event.target.value);
  };

  const handleBioChange = (event) => {
    setNewBio(event.target.value); // Handle bio change
  };

  const handleUpdateAvatarUrl = async () => {
    try {
      const updatedProfile = await updateProfile(
        userProfile.name,
        { avatar: { url: newAvatarUrl } },
        localStorage.getItem("jwt")
      );
      setUserProfile(updatedProfile.data);
      setNewAvatarUrl("");
    } catch (error) {
      console.error("Error updating Avatar URL:", error);
    }
  };

  const handleUpdateBannerUrl = async () => {
    try {
      const updatedProfile = await updateProfile(
        userProfile.name,
        { banner: { url: newBannerUrl } },
        localStorage.getItem("jwt")
      );
      setUserProfile(updatedProfile.data);
      setNewBannerUrl("");
    } catch (error) {
      console.error("Error updating Banner URL:", error);
    }
  };

  const handleUpdateBio = async () => {
    try {
      const updatedProfile = await updateProfile(
        userProfile.name,
        { bio: newBio }, // Update bio
        localStorage.getItem("jwt")
      );
      setUserProfile(updatedProfile.data);
      setNewBio("");
    } catch (error) {
      console.error("Error updating Bio:", error);
    }
  };

  const handleUpdateVenueManager = async () => {
    try {
      const updatedProfile = await updateProfile(
        userProfile.name,
        { venueManager: !isVenueManager },
        localStorage.getItem("jwt")
      );
      setUserProfile(updatedProfile.data);
      setIsVenueManager(updatedProfile.data.venueManager || false);
    } catch (error) {
      console.error("Error updating Venue Manager status:", error);
    }
  };

  return (
    <div className="w-full">
      {isProfileLoading ? (
        <p>Loading..</p>
      ) : (
        <div className="relative w-full mt-4">
          <Banner
            bannerUrl={userProfile?.banner?.url}
            bannerAlt={userProfile?.banner?.alt}
            isAuthenticated={isAuthenticated}
            isUser={userName === authUser?.data?.name}
            handleUpdateBannerUrl={handleUpdateBannerUrl}
            handleBannerUrlChange={handleBannerUrlChange}
          />
          <div className="flex justify-center gap-8 mt-4">
            <ProfileInformation
              userProfile={userProfile}
              defaultUser={defaultUser}
              isAuthenticated={isAuthenticated}
              isUser={userName === authUser?.data?.name}
              isVenueManager={isVenueManager}
              handleUpdateAvatarUrl={handleUpdateAvatarUrl}
              handleAvatarUrlChange={handleAvatarUrlChange}
              handleUpdateBio={handleUpdateBio} // Pass bio update handler
              handleBioChange={handleBioChange} // Pass bio change handle
              venuesCount={venuesCount}
              bookingsCount={bookingsCount}
              guestsCount={guestsCount}
            />
            <div className="flex flex-col">
              {userName &&
                isAuthenticated &&
                authUser &&
                userName === authUser.data.name && (
                  <div className="flex flex-col gap-4">
                    <div
                      className={`flex items-center justify-between w-full ${
                        isVenueManager
                          ? "bg-gradient-to-b from-rose-400 to-rose-500"
                          : "bg-white border-2 border-rose-400"
                      } p-4 rounded-3xl`}
                    >
                      {isVenueManager && (
                        <div className="flex items-center text-white px-4 py-2.5">
                          <RiShieldCheckFill size={22} />
                          <span className="ml-2">Venue Manager</span>
                        </div>
                      )}
                      <button
                        onClick={handleUpdateVenueManager}
                        className={`px-4 rounded ${
                          isVenueManager
                            ? "text-xs hover:text-gray-300"
                            : "flex items-center gap-1.5 text-sm py-2 px-4 bg-white border-2 text-gray-700 font-semibold rounded-xl transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-700 hover:text-white"
                        }`}
                      >
                        {!isVenueManager && (
                          <AiOutlineEdit size={16} className="mr-1" />
                        )}
                        {isVenueManager
                          ? "Remove Venue Manager"
                          : "Become Venue Manager"}
                      </button>
                    </div>
                    <div className="mt-2 pt-4 pb-2 border-t">
                      <UsersFirstBooking userName={userName} />
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
