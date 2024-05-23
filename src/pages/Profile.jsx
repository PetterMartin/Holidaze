import { useEffect, useState } from "react";
import { getProfile } from "../libs/api/Profiles";
import defaultUser from "../../public/assets/images/defaultUser.png";
import UsersVenues from "../components/profile/UsersVenues";
import UsersBookings from "../components/profile/UsersBookings";
import Banner from "../components/profile/Banner";
import ProfileInformation from "../components/profile/ProfileInformation";

export default function Profile() {
  const searchParams = new URLSearchParams(window.location.search);
  const userName = searchParams.get("name"); 
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedToken = localStorage.getItem("jwt");

        if (userName && storedToken) {
          try {
            const profile = await getProfile(userName, storedToken);

            setUserProfile(profile.data);
          } catch (error) {
            console.error("Error fetching user profile:", error.message);
          } finally {
            setIsProfileLoading(false); 
          }
        } else {
          setIsProfileLoading(false); 
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, [userName]);


  return (
    <div className="flex flex-col items-center px-8 mt-16">
      {isProfileLoading ? (
        <p>Loading..</p>
      ) : (
        <div className="relative w-full mt-4">
          <Banner
            bannerUrl={userProfile?.banner?.url}
            bannerAlt={userProfile?.banner?.alt}
          />
          <div className="flex justify-center items-center gap-8 p-4">
            <ProfileInformation userProfile={userProfile} defaultUser={defaultUser}/>
          </div>

          <UsersVenues userName={userName} userProfile={userProfile} />
          <UsersBookings userName={userName} />
        </div>
      )}
    </div>
  );
}
