import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import EditBannerModal from "../modal/EditBannerModal";

const Banner = ({
  bannerUrl,
  bannerAlt,
  isAuthenticated,
  isUser,
  onAddCustomBanner,
  handleUpdateBannerUrl,
  handleBannerUrlChange,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditBanner = () => {
    setShowEditModal(true);
  };

  return (
    <div className="relative w-full">
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt={bannerAlt}
          className="object-cover w-full h-72 rounded-3xl"
        />
      ) : (
        <div className="bg-gradient-to-r w-full h-72 from-blue-600 to-blue-400"></div>
      )}
      {isAuthenticated && isUser && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={bannerUrl ? handleEditBanner : onAddCustomBanner}
            className="flex items-center gap-1.5 text-sm py-2 px-4 bg-white border-2 text-gray-700 font-semibold rounded-xl hover:border-rose-400 transition duration-300 ease-in-out"
          >
            {bannerUrl ? <AiOutlineEdit size={16} /> : null}
            {bannerUrl ? "Edit Banner" : "Add Custom Banner"}
          </button>
        </div>
      )}
      {showEditModal && (
        <EditBannerModal
          handleUpdateBannerUrl={handleUpdateBannerUrl} // Pass down the function
          handleBannerUrlChange={handleBannerUrlChange} // Pass down the function
          onClose={() => setShowEditModal(false)} // Pass down the function
        />
      )}
    </div>
  );
};

export default Banner;
