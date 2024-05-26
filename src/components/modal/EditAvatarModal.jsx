import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const EditAvatarModal = ({
  handleUpdateAvatarUrl,
  handleAvatarUrlChange,
  onClose,
}) => {
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
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
    if (!isValidUrl(newAvatarUrl)) {
      setError("Invalid URL");
      setLoading(false);
      return;
    }

    try {
      await handleUpdateAvatarUrl(newAvatarUrl);
      onClose();
    } catch (error) {
      setError("Failed to update URL");
      setLoading(false);
    }
  };

  const handleUrlInput = (e) => {
    const { value } = e.target;
    setNewAvatarUrl(value);
    setError("");
    handleAvatarUrlChange(e);
    setShowPreview(isValidUrl(value));
  };

  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/50">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div>
            <div className="h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-one">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  className="p-1 border-0 hover:text-gray-400 transition absolute left-9"
                  onClick={onClose}
                >
                  <AiOutlineClose size={18} />
                </button>
                <div className="text-lg font-semibold">Edit Avatar</div>
              </div>
              <div className="relative p-6 flex flex-col items-center">
                <div className="w-full relative mb-6">
                  <input
                    type="text"
                    value={newAvatarUrl}
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
                    New Avatar URL
                  </label>
                  {newAvatarUrl && (
                    <button
                      className="absolute top-4 right-2 transform -translate-y-1/2 bg-transparent border-none p-1 hover:text-gray-400 transition"
                      onClick={() => {
                        setNewAvatarUrl("");
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
                  <div className="h-36 w-36 mb-6">
                    <img
                      src={newAvatarUrl}
                      alt="Avatar Preview"
                      className="object-cover w-full h-full rounded-full border-4 border-rose-400"
                    />
                  </div>
                )}

                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className={`w-full p-3 bg-gradient-to-b from-rose-600 to-rose-500 text-white font-semibold rounded-md transition duration-200 ease-in-out ${
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

export default EditAvatarModal;
