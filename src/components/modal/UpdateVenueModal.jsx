import { useState, useEffect } from "react";
import { updateVenue, fetchVenuesById, deleteVenue } from "../../libs/api/Venues";
import { AiOutlineClose } from "react-icons/ai";

const UpdateVenueModal = ({
  venueId,
  closeModal,
  name,
  description,
  media,
  onUpdateSuccess,
  onDeleteSuccess, // Callback function from UsersVenues component
}) => {
  const [venueName, setVenueName] = useState(name || "");
  const [venueDescription, setVenueDescription] = useState(description || "");
  const [venueMedia, setVenueMedia] = useState(
    media && media.length > 0 ? media[0].url : ""
  );

  useEffect(() => {
    // Update the venue media when media prop changes
    if (media && media.length > 0) {
      setVenueMedia(media[0].url);
    }
  }, [media]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch the existing venue data first
      const existingVenueData = await fetchVenuesById(venueId);

      // Update the venue data
      const updatedVenueData = {
        ...existingVenueData,
        name: venueName,
        description: venueDescription,
        media: [
          { url: venueMedia, alt: existingVenueData.media?.[0]?.alt || "" },
        ], // Update the media URL
      };

      // Update the venue
      await updateVenue(venueId, updatedVenueData);

      // Invoke the callback function with the updated venue data
      onUpdateSuccess(updatedVenueData);

      closeModal(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const handleDeleteVenue = async () => {
    try {
      // Delete the venue
      await deleteVenue(venueId);
  
      // Invoke the callback function to update the venue list after successful deletion
      onDeleteSuccess();
  
      closeModal(); // Close the modal after successful deletion
    } catch (error) {
      console.error("Error deleting venue:", error);
    }
  };

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/50">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        {/* CONTENT */}
        <div>
          <div className="h-full lg:h-auo md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-one">
            {/* HEADER */}
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <button
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                onClick={closeModal}
              >
                <AiOutlineClose size={18} />
              </button>
              <div className="text-lg font-semibold">Update Venue</div>
            </div>
            {/* BODY */}
            <div className="relative p-6 flex-auto">
              <form onSubmit={handleSubmit}>
                {/* Input field for venue name */}
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="Enter venue name"
                  className="w-full p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Input field for venue description */}
                <textarea
                  value={venueDescription}
                  onChange={(e) => setVenueDescription(e.target.value)}
                  placeholder="Enter venue description"
                  className="w-full p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Input field for venue media */}
                <input
                  type="text"
                  value={venueMedia}
                  onChange={(e) => setVenueMedia(e.target.value)}
                  placeholder="Enter venue media URL"
                  className="w-full p-4 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Display the image */}
                {venueMedia && (
                  <img
                    src={venueMedia}
                    alt="Venue Image"
                    className="w-1/2 h-auto mb-4"
                  />
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full p-4 bg-gradient-to-b from-rose-600 to-rose-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
                >
                  Update Venue
                </button>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={handleDeleteVenue}
                  className="w-full p-4 bg-gradient-to-b from-red-600 to-red-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
                >
                  Delete Venue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateVenueModal;
