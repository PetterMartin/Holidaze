import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../libs/api";
import defaultUser from "../../public/assets/images/defaultUser.png";
import { useAuth } from "../components/auth/Auth";

export default function Profile() {
  const { isLoggedIn } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [newBannerUrl, setNewBannerUrl] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (isLoggedIn) {
          const userName = localStorage.getItem("user_name");
          const profile = await getProfile(userName);
          setUserProfile(profile.data);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [isLoggedIn]);

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
                        userProfile.avatar.url === defaultUser
                          ? defaultUser
                          : userProfile.avatar.url
                      }
                      alt={userProfile.avatar.alt}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
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
              <h1 className="text-3xl font-semibold">{userProfile.name}</h1>
              <p className="text-gray-600">Email: {userProfile.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
