import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const EditBannerModal = ({
  handleUpdateBannerUrl,
  handleBannerUrlChange,
  onClose,
}) => {
  const [newBannerUrl, setNewBannerUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // State to control image preview

  const isValidUrl = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return pattern.test(url);
  };

  const handleUpdate = async () => {
    setLoading(true);
    // Check if URL is valid
    if (!isValidUrl(newBannerUrl)) {
      setError("Invalid URL");
      setLoading(false);
      return;
    }

    try {
      await handleUpdateBannerUrl(newBannerUrl);
      onClose();
    } catch (error) {
      setError("Failed to update URL");
      setLoading(false);
    }
  };

  const handleUrlInput = (e) => {
    const { value } = e.target;
    setNewBannerUrl(value);
    setError("");
    handleBannerUrlChange(e);
    setShowPreview(isValidUrl(value));
  };

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/50">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div>
            <div className="h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-one">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  className="p-1 border-0 hover:text-gray-400 transition absolute left-9"
                  onClick={onClose}
                >
                  <AiOutlineClose size={18} />
                </button>
                <div className="text-lg font-semibold">Edit Banner</div>
              </div>
              {/* BODY */}
              <div className="relative p-6 flex-auto">
                <div className="w-full relative mb-6">
                  <input
                    type="text"
                    value={newBannerUrl}
                    onChange={handleUrlInput}
                    className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition hover:border-gray-500 focus:border-gray-500 cursor-pointer"
                  />
                  <label
                    className="
                  absolute 
                  text-md
                  duration-150 
                  transform 
                  -translate-y-3 
                  top-5 
                  z-10 
                  origin-[0] 
                  left-4
                  peer-placeholder-shown:scale-100 
                  peer-placeholder-shown:translate-y-0 
                  peer-focus:scale-75
                  peer-focus:-translate-y-4
                "
                  >
                    New Banner URL
                  </label>
                  {newBannerUrl && (
                    <button
                      className="absolute top-4 right-2 transform -translate-y-1/2 bg-transparent border-none p-1 hover:text-gray-400 transition"
                      onClick={() => {
                        setNewBannerUrl("");
                        setShowPreview(false);
                        setError("");
                      }}
                    >
                      <AiOutlineClose size={16} />
                    </button>
                  )}
                </div>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                {showPreview && (
                  <div className="flex justify-center mt-2 mb-6">
                    <img
                      src={newBannerUrl}
                      alt="Banner Preview"
                      className="max-w-full object-cover h-auto max-h-56 rounded-xl"
                    />
                  </div>
                )}

                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className={`text-sm md:text-base w-full p-3 bg-gradient-to-b from-rose-400 to-rose-500 text-white font-semibold rounded-md transition duration-200 ease-in-out ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-80"
                  }`}
                >
                  {loading ? "Updating..." : "Update Banner URL"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBannerModal;
