import { useState, useEffect } from "react";
import { getProfile } from "../libs/api/Profiles";

export default function useFetchUserProfile(userName) {
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [fetchProfileError, setFetchProfileError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem("jwt");

        if (userName && storedToken) {
          const profile = await getProfile(userName, storedToken);
          console.log("User Profile:", profile); // Log profile data
          setUserProfile(profile.data);
          setIsProfileLoading(false);
        } else {
          setIsProfileLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setFetchProfileError(error);
        setIsProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [userName]);

  return { userProfile, isProfileLoading, fetchProfileError };
}
