import { useState } from "react";
import EditAvatarModal from "../modal/EditAvatarModal";
import EditBioModal from "../modal/EditBioModal"; // Import EditBioModal
import ProfileFeatures from "./ProfileFeatures";

import { AiOutlineEdit } from "react-icons/ai";
import { RiShieldCheckFill } from "react-icons/ri";

const ProfileInformation = ({
  userProfile,
  defaultUser,
  isAuthenticated,
  isUser,
  isVenueManager,
  handleUpdateAvatarUrl,
  handleAvatarUrlChange,
  handleUpdateBio,
  handleBioChange,
  venuesCount,
  bookingsCount,
  guestsCount,
}) => {
  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false);
  const [showEditBioModal, setShowEditBioModal] = useState(false); 

  const handleEditAvatar = () => {
    setShowEditAvatarModal(true);
  };

  const handleEditBio = () => {
    setShowEditBioModal(true);
  };

  if (!userProfile) {
    // Handle case where userProfile is null (e.g., after logging out)
    return null; // or return a loading indicator, error message, or any other appropriate UI
  }

  const avatarUrl =
    userProfile?.avatar?.url ===
    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
      ? defaultUser
      : userProfile?.avatar?.url;

  const avatarAlt = userProfile?.avatar?.alt || "User avatar";
  const userName = userProfile.name;
  const userEmail = userProfile.email;
  const userBio = userProfile?.bio || "No bio provided";

  return (
    <div className="flex flex-col p-4 rounded-xl">
      <div className="mx-auto flex flex-col md:flex-row items-center md:items-start">
        <div className="flex flex-col">
          <div className="h-32 w-32 relative">
            <img
              src={avatarUrl}
              alt={avatarAlt}
              className="object-cover w-full h-full rounded-full border-4 border-rose-400"
            />
            {isVenueManager && (
              <div className="absolute bottom-0 right-2 text-white bg-gradient-to-b from-rose-400 to-rose-500 rounded-full p-1.5">
                <RiShieldCheckFill size={22} />
              </div>
            )}
          </div>
          <div className="mt-4 ms-0.5">
            {isAuthenticated && isUser && (
              <button
                onClick={handleEditAvatar}
                className="flex items-center gap-1.5 text-xs md:text-sm py-2 px-4 bg-white border-2 text-gray-700 font-semibold rounded-xl transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-700 hover:text-white"
              >
                {avatarUrl ? <AiOutlineEdit size={16} /> : null}
                {avatarUrl ? "Edit Avatar" : "Add Custom Avatar"}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:ms-8 items-center md:items-start">
          <div className="flex flex-col items-center md:items-start pb-4">
            <h1 className="text-2xl font-semibold mt-2">{userName}</h1>
            <h2 className="text-sm ms-1 text-gray-500">{userEmail}</h2>
          </div>
          <ProfileFeatures
            venuesCount={venuesCount}
            bookingsCount={bookingsCount}
            guestsCount={guestsCount}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mt-4 pt-4 pb-2 border-t">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-xl font-semibold">About</h1>
          <p className="text-gray-500">{userBio}</p>
        </div>
        <div className="mt-4 ms-0.5">
          {isAuthenticated && isUser && (
            <button
              onClick={handleEditBio}
              className="flex items-center gap-1.5 text-sm py-2 px-4 bg-white border-2 text-gray-700 font-semibold rounded-xl transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-700 hover:text-white"
            >
              {userBio ? <AiOutlineEdit size={16} /> : null}
              {userBio ? "Edit Bio" : "Add Custom Bio"}
            </button>
          )}
        </div>
      </div>

      {showEditAvatarModal && (
        <EditAvatarModal
          handleUpdateAvatarUrl={handleUpdateAvatarUrl}
          handleAvatarUrlChange={handleAvatarUrlChange}
          onClose={() => setShowEditAvatarModal(false)}
        />
      )}

      {showEditBioModal && (
        <EditBioModal
          handleUpdateBio={handleUpdateBio} // Pass bio update handler
          handleBioChange={handleBioChange} // Pass bio change handler
          onClose={() => setShowEditBioModal(false)}
        />
      )}
    </div>
  );
};

export default ProfileInformation;
