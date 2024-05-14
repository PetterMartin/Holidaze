import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/Auth";
import { getProfile, updateProfile } from "../libs/api/Profiles";
import defaultUser from "../../public/assets/images/defaultUser.png";
import UsersVenues from "../components/profile/UsersVenues";
import UsersBookings from "../components/profile/UsersBookings";
import Banner from "../components/profile/Banner";
import ProfileInformation from "../components/profile/ProfileInformation";

export default function Profile() {
  const { user: authUser } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const userName = searchParams.get("name"); // Use userName instead of userId
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [newBannerUrl, setNewBannerUrl] = useState("");
  const [isVenueManager, setIsVenueManager] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem("jwt");

        if (userName && storedToken) {
          // Use userName instead of userId
          try {
            const profile = await getProfile(userName, storedToken); // Use userName instead of userId

            setUserProfile(profile.data);
            setIsVenueManager(profile.data.venueManager || false);
            setIsAuthenticated(true);
          } catch (error) {
            console.error("Error fetching user profile:", error.message);
          } finally {
            setIsProfileLoading(false); // Set loading state to false when done loading
          }
        } else {
          setIsAuthenticated(false);
          setIsProfileLoading(false); // Set loading state to false if conditions are not met
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsProfileLoading(false); // Set loading state to false in case of an error
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

  const handleUpdateVenueManager = async () => {
    try {
      const updatedProfile = await updateProfile(
        userProfile.name,
        { venueManager: !isVenueManager }, // Toggle venue manager status
        localStorage.getItem("jwt")
      );
      setUserProfile(updatedProfile.data);
      // Update venue manager status
      setIsVenueManager(updatedProfile.data.venueManager || false);
    } catch (error) {
      console.error("Error updating Venue Manager status:", error);
    }
  };

  return (
    <div className="flex flex-col items-center px-8">
      {isProfileLoading ? (
        <p>Loading...</p>
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
          <div className="flex justify-center items-center gap-8 p-4">
            <ProfileInformation userProfile={userProfile} defaultUser={defaultUser}/>
            {userName &&
              isAuthenticated &&
              authUser &&
              userName === authUser.data.name && (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={newBannerUrl}
                    onChange={handleBannerUrlChange}
                    placeholder="Enter new Banner URL"
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={handleUpdateBannerUrl}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Update Banner URL
                  </button>
                  <input
                    type="text"
                    value={newAvatarUrl}
                    onChange={handleAvatarUrlChange}
                    placeholder="Enter new Avatar URL"
                    className="border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    onClick={handleUpdateAvatarUrl}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Update Avatar URL
                  </button>
                  {/* Toggle button for venue manager status */}
                  <button
                    onClick={handleUpdateVenueManager}
                    className={`text-white px-4 py-2 rounded
                } ${
                  isVenueManager
                    ? "bg-rose-500 hover:bg-rose-600"
                    : "bg-emerald-400 hover:bg-emerald-500"
                }`}
                  >
                    {isVenueManager
                      ? "Remove Venue Manager"
                      : "Become Venue Manager"}
                  </button>
                </div>
              )}
          </div>

          <UsersVenues userName={userName} />
          <UsersBookings userName={userName} />
        </div>
      )}
    </div>
  );
}
