import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Toaster, toast } from "sonner";

const EditBioModal = ({ handleUpdateBio, handleBioChange, onClose }) => {
  const [newBio, setNewBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    if (newBio.trim() === "") {
      setError("Bio cannot be empty");
      setLoading(false);
      return;
    }

    try {
      await handleUpdateBio(newBio);
      toast.success(`Bio Updated`, {
        duration: 2000,
      });
      onClose();
    } catch (error) {
      setError("Failed to update Bio");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewBio(value);
    setError("");
    handleBioChange(e);
  };

  return (
    <>
      <Toaster richColors />
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
                <div className="text-lg font-semibold">Edit Bio</div>
              </div>
              <div className="relative p-6 flex flex-col items-center">
                <div className="w-full relative mb-6">
                  <textarea
                    value={newBio}
                    onChange={handleInputChange}
                    className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition hover:border-gray-500 focus:border-gray-500 cursor-pointer"
                    rows="4"
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
                    New Bio
                  </label>
                  {newBio && (
                    <button
                      className="absolute top-4 right-2 transform -translate-y-1/2 bg-transparent border-none p-1 hover:text-gray-400 transition"
                      onClick={() => {
                        setNewBio("");
                        setError("");
                      }}
                    >
                      <AiOutlineClose size={16} />
                    </button>
                  )}
                </div>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className={`text-sm md:text-base w-full p-3 bg-gradient-to-b from-rose-400 to-rose-500 text-white font-semibold rounded-md transition duration-200 ease-in-out ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-80"
                  }`}
                >
                  {loading ? "Updating..." : "Update Bio"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBioModal;
