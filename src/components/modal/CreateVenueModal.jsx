import { useState } from "react";
import { createVenue } from "../../libs/api/Venues";
import { AiOutlineClose } from "react-icons/ai";

const CreateVenueModal = ({ isModalOpen, setModalOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: "",
      lat: 0,
      lng: 0,
    },
  });

  const [mediaUrl, setMediaUrl] = useState("");
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "mediaUrl") {
      setMediaUrl(value);
    } else if (name === "price" || name === "maxGuests") {
      const parsedValue = parseInt(value);
      setFormData({
        ...formData,
        [name]: parsedValue,
      });
    } else if (name.startsWith("media")) {
      const mediaIndex = parseInt(name.replace("media", ""));
      const updatedMedia = [...formData.media];
      const property = name.split(".")[1];
      updatedMedia[mediaIndex] = {
        ...updatedMedia[mediaIndex],
        [property]: value,
      };
      setFormData({
        ...formData,
        media: updatedMedia,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleMetaChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      meta: {
        ...formData.meta,
        [name]: checked,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMedia = [...formData.media];
    updatedMedia[0].url = mediaUrl;
    setFormData({
      ...formData,
      media: updatedMedia,
    });

    console.log("Submitting formData:", formData); // Add this console log

    try {
      const response = await createVenue(formData);
      console.log("Venue created:", response);
      setModalOpen(false); // Close the modal upon successful submission
    } catch (error) {
      console.error("Error creating venue:", error);
      setError(error.message); // Set error state with error message
    }
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal when the close button is clicked
  };

  return (
    <>
      {isModalOpen && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
          <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
            <div className="h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-one">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b">
                <button
                  className="p-1 border-0 hover:text-gray-400 transition absolute left-9"
                  onClick={closeModal}
                >
                  <AiOutlineClose size={18} />
                </button>
                <div className="text-lg font-semibold">Create Venue</div>
              </div>
              <div className="relative p-6 flex-auto">
                <div className="text-start">
                  {error && <div className="text-red-600 mb-4">{error}</div>}
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-800 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-800 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-800 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-800 mb-1">
                        Max Guests
                      </label>
                      <input
                        type="number"
                        name="maxGuests"
                        value={formData.maxGuests}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-800 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="mediaUrl"
                        value={mediaUrl}
                        onChange={handleChange}
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="flex gap-6">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-800 mb-1">
                          Wifi
                        </label>
                        <input
                          type="checkbox"
                          name="wifi"
                          checked={formData.meta.wifi}
                          onChange={handleMetaChange}
                          className="mr-2"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-800 mb-1">
                          Parking
                        </label>
                        <input
                          type="checkbox"
                          name="parking"
                          checked={formData.meta.parking}
                          onChange={handleMetaChange}
                          className="mr-2"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-800 mb-1">
                          Breakfast
                        </label>
                        <input
                          type="checkbox"
                          name="breakfast"
                          checked={formData.meta.breakfast}
                          onChange={handleMetaChange}
                          className="mr-2"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-800 mb-1">
                          Pets
                        </label>
                        <input
                          type="checkbox"
                          name="pets"
                          checked={formData.meta.pets}
                          onChange={handleMetaChange}
                          className="mr-2"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-b from-rose-600 to-rose-500 text-white font-semibold rounded-md py-2 transition duration-200 ease-in-out hover:opacity-80"
                    >
                      Create Venue
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateVenueModal;
