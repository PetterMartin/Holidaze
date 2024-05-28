import { useState, useEffect } from "react";
import {
  updateVenue,
  fetchVenuesById,
  deleteVenue,
} from "../../libs/api/Venues";
import { AiOutlineClose } from "react-icons/ai";
import { Toaster, toast } from "sonner";

const UpdateVenueModal = ({
  venueId,
  closeModal,
  name,
  description,
  media,
  onUpdateSuccess,
  onDeleteSuccess,
}) => {
  const [venueName, setVenueName] = useState(name || "");
  const [venueDescription, setVenueDescription] = useState(description || "");
  const [venueMedia, setVenueMedia] = useState(
    media && media.length > 0 ? media[0].url : ""
  );

  useEffect(() => {
    if (media && media.length > 0) {
      setVenueMedia(media[0].url);
    }
  }, [media]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingVenueData = await fetchVenuesById(venueId);
      const updatedVenueData = {
        ...existingVenueData,
        name: venueName,
        description: venueDescription,
        media: [
          { url: venueMedia, alt: existingVenueData.media?.[0]?.alt || "" },
        ],
      };

      await updateVenue(venueId, updatedVenueData);
      onUpdateSuccess(updatedVenueData);
      toast.success("Venue Updated", {
        duration: 2000,
      });
      closeModal();
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const handleDeleteVenue = async () => {
    try {
      await deleteVenue(venueId);
      onDeleteSuccess();
      toast.success("Venue Deleted", {
        duration: 2000,
      });
      closeModal();
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  return (
    <>
      <Toaster richColors />
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/50">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div>
            <div className="h-full lg:h-auo md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-one">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  className="p-1 border-0 hover:text-gray-400 transition absolute left-9"
                  onClick={closeModal}
                >
                  <AiOutlineClose size={18} />
                </button>
                <div className="text-lg font-semibold">Update Venue</div>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="Enter venue name"
                    className="w-full p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    value={venueDescription}
                    onChange={(e) => setVenueDescription(e.target.value)}
                    placeholder="Enter venue description"
                    className="w-full p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={venueMedia}
                    onChange={(e) => setVenueMedia(e.target.value)}
                    placeholder="Enter venue media URL"
                    className="w-full p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {venueMedia && (
                    <img
                      src={venueMedia}
                      alt="Venue Image"
                      className="w-1/2 h-auto mb-4"
                    />
                  )}

                  <button
                    type="submit"
                    className="w-full p-4 bg-gradient-to-b from-rose-400 to-rose-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
                  >
                    Update Venue
                  </button>

                  <div className="flex justify-between">
                    <div></div>
                    <button
                    type="button"
                    onClick={handleDeleteVenue}
                    className="text-red-500 hover:underline mt-4"
                  >
                    Delete Venue
                  </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateVenueModal;
