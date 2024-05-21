import { useState } from "react";
import { createVenue } from "../../libs/api/Venues";
import { AiOutlineClose } from "react-icons/ai";
import GuestCounter from "../buttons/GuestCounter";
import LocationDetailsForm from "./createvenue/LocationDetailsForm";
import MediaUrlInput from "./createvenue/MediaUrlInput";
import MetaCheckBox from "./createvenue/MetaCheckBox";
import NameAndDescription from "./createvenue/NameAndDescription";

const CreateVenueModal = ({ isModalOpen, setModalOpen }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: [],
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

  const handleGuestChange = (guests) => {
    setFormData({
      ...formData,
      maxGuests: guests,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

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
    } else if (name === "lat" || name === "lng") {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: parseFloat(value),
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handlePositionChange = (position) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        lat: position.lat,
        lng: position.lng,
      },
    });
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

  const handleAddImageUrl = () => {
    if (mediaUrl) {
      setFormData({
        ...formData,
        media: [...formData.media, { url: mediaUrl, alt: "" }],
      });
      setMediaUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    const newMedia = [...formData.media];
    newMedia.splice(index, 1);
    setFormData({
      ...formData,
      media: newMedia,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting formData:", formData);

    try {
      const response = await createVenue(formData);
      console.log("Venue created:", response);
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating venue:", error);
      setError(error.message);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <NameAndDescription
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 1:
        return (
          <LocationDetailsForm
            formData={formData}
            handleChange={handleChange}
            handlePositionChange={handlePositionChange}
          />
        );
      case 2:
      case 3:
        return (
          <MediaUrlInput
            mediaUrl={mediaUrl}
            handleChange={handleChange}
            handleAddImageUrl={handleAddImageUrl}
            handleRemoveImage={handleRemoveImage}
            media={formData.media}
          />
        );
      case 4:
        return (
          <div className="flex gap-6">
            <MetaCheckBox
              name="wifi"
              checked={formData.meta.wifi}
              handleChange={handleMetaChange}
            />
            <MetaCheckBox
              name="parking"
              checked={formData.meta.parking}
              handleChange={handleMetaChange}
            />
            <MetaCheckBox
              name="breakfast"
              checked={formData.meta.breakfast}
              handleChange={handleMetaChange}
            />
            <MetaCheckBox
              name="pets"
              checked={formData.meta.pets}
              handleChange={handleMetaChange}
            />
            <GuestCounter onGuestChange={handleGuestChange} />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="flex justify-center items-center pt-6 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
          <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full">
            <div className="h-full lg:h-auto md:h-auto  border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-one">
              <div className="flex items-center p-6 rounded-t justify-center relative border-b">
                <button
                  className="p-1 border-0 hover:text-gray-400 transition absolute left-9"
                  onClick={closeModal}
                >
                  <AiOutlineClose size={18} />
                </button>
                <div className="text-lg font-semibold">Create Venue</div>
              </div>
              <div className="p-6">
                <div className="relative flex-auto">
                  {error && <div className="text-red-600 mb-4">{error}</div>}
                  <form onSubmit={handleSubmit}>
                    {renderStep()}
                    <div className="mt-4 flex justify-between gap-4 font-semibold">
                      {step > 0 && (
                        <button
                          type="button"
                          onClick={handlePrevious}
                          className="w-full border-2 border-gray-700 rounded-md p-4 transition duration-200 ease-in-out hover:bg-gray-700 hover:text-white"
                        >
                          Back
                        </button>
                      )}
                      {step < 4 && (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="w-full bg-gradient-to-b from-rose-400 to-rose-500 text-white p-4 rounded-md transition duration-200 ease-in-out hover:opacity-80"
                        >
                          Next
                        </button>
                      )}
                      {step === 4 && (
                        <button
                          type="submit"
                          className="w-full bg-gradient-to-b from-rose-600 to-rose-500 text-white rounded-md p-4 transition duration-200 ease-in-out hover:opacity-80"
                        >
                          Create Venue
                        </button>
                      )}
                    </div>
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
