import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/Auth";
import { getProfile, updateProfile } from "../libs/api/Profiles";
import defaultUser from "../../public/assets/images/defaultUser.png";
import UsersVenues from "../components/profile/UsersVenues";
import UsersBookings from "../components/profile/UsersBookings";

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

        if (userName && storedToken) { // Use userName instead of userId
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
    <div className="flex flex-col items-center justify-center">
      {isProfileLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="banner-container relative w-full">
          {userProfile.banner ? (
            <img
              src={userProfile.banner.url}
              alt={userProfile.banner.alt}
              className="object-cover w-full h-72"
            />
          ) : (
            <div className="bg-gradient-to-r w-full h-72 from-blue-600 to-blue-400"></div>
          )}
          <div className="flex justify-center items-center gap-8 p-4">
            <div className="flex flex-col">
              <div className="mx-auto flex items-center justify-center relative">
                <div className="h-40 w-40 relative">
                  <div className="absolute inset-1.5 rounded-full bg-white overflow-hidden p-2">
                    <img
                      src={
                        userProfile.avatar.url ===
                        "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
                          ? defaultUser
                          : userProfile.avatar.url
                      }
                      alt={userProfile.avatar.alt}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-semibold">{userProfile.name}</h1>
              <p className="text-gray-600">Email: {userProfile.email}</p>
            </div>
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
