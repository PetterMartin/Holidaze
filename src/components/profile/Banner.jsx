import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import EditBannerModal from "../modal/EditBannerModal";

const Banner = ({
  bannerUrl,
  bannerAlt,
  isAuthenticated,
  isUser,
  handleUpdateBannerUrl,
  handleBannerUrlChange,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditBanner = () => {
    setShowEditModal(true);
  };

  return (
    <div className="w-full flex justify-center items-center mt-4">
      {bannerUrl ? (
        <img
          src={bannerUrl}
          alt={bannerAlt}
          className="w-[1400px] h-32 md:h-80 object-cover rounded-3xl"
        />
      ) : (
        <div className="bg-gradient-to-r h-full from-blue-600 to-blue-400 w-full rounded-3xl"></div>
      )}
      {isAuthenticated && isUser && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleEditBanner}
            className="flex items-center gap-1.5 text-sm py-2 px-4 bg-white border-2 text-gray-700 font-semibold rounded-xl transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-700 hover:text-white"
          >
            <AiOutlineEdit size={16} />
            Edit Banner
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
