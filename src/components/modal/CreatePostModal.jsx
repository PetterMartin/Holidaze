import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { createVenue } from "../../libs/api/Venues";
import CountrySelect from "../buttons/CountrySelect";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  IMAGES: 2,
  DESCRIPTION: 3,
  TIME: 4,
};

export default function CreatePostModal({ isModalOpen, setModalOpen }) {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null); 
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

  const closeModal = () => {
    setModalOpen(false);
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

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.target;
    let formName, description, maxGuests, price;

    switch (step) {
      case STEPS.CATEGORY:
      case STEPS.LOCATION:
        break;

      case STEPS.IMAGES:
        break;

      case STEPS.DESCRIPTION:
        break;

      case STEPS.TIME:
        formName = form.elements.name.value;
        maxGuests = form.elements.maxGuests.value;
        description = form.elements.body.value;
        price = form.elements.price.value;
        break;

      default:
        break;
    }

    const newListing = {
      name: formName || "",
      description: description || "",
      media: mediaUrl,
      maxGuests: maxGuests || "",
      price: price || "",
    };
  }

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

  const moveToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const moveToPreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  let bodyContent = (
    <>
      <div className="relative p-6 flex-auto">
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
      </div>
      <div className="flex flex-col gap-4 p-6">
        <button
          type="button"
          onClick={moveToNextStep}
          className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
        >
          Next
        </button>
      </div>
    </>
  );

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <div className="relative p-6 flex-auto">
            <div className="text-start">
              <div className="text-2xl font-semibold">
                Where are you located?
              </div>
              <div className="font-light text-neutral-500 mt-2 mb-6">
                Select the country you will be sending from
              </div>
            </div>
            <CountrySelect value={selectedCountry} onChange={handleChange} />
          </div>
        </div>
        <div className="flex p-6 gap-4">
          <button
            type="button"
            onClick={moveToPreviousStep}
            className="w-full border-2 border-gray-800 rounded-md font-semibold hover:bg-gray-800 hover:text-white transition duration-200 ease-in-out"
          >
            Back
          </button>
          <button
            type="button"
            onClick={moveToNextStep}
            className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
          >
            Next
          </button>
        </div>
      </>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <>
        <div className="flex flex-col">
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
          <div className="flex px-6 pb-6 gap-4">
            <button
              type="button"
              onClick={moveToPreviousStep}
              className="w-full border-2 border-gray-800 rounded-md font-semibold hover:bg-gray-800 hover:text-white transition duration-200 ease-in-out"
            >
              Back
            </button>
            <button
              type="button"
              onClick={moveToNextStep}
              className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
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
          <div className="flex px-6 pb-6 gap-4">
            <button
              type="button"
              onClick={moveToPreviousStep}
              className="w-full border-2 border-gray-800 rounded-md font-semibold hover:bg-gray-800 hover:text-white transition duration-200 ease-in-out"
            >
              Back
            </button>
            <button
              type="button"
              onClick={moveToNextStep}
              className={`w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80 ${
                !title && "opacity-50 cursor-not-allowed"
              }`}
              disabled={!title}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }

  if (step === STEPS.TIME) {
    bodyContent = (
      <>
        <div className="flex flex-col">
          <div className="relative px-6 flex-auto">
            <div className="text-start">
              <div className="text-2xl font-semibold mt-6">
                Review Your Listing
              </div>
              <div className="font-light text-neutral-500 mt-2">
                Take a moment to ensure everything looks just right!
              </div>
            </div>
            <div className="flex flex-col items-center text-center w-full">
              <div className="w-full relative">
                <input
                  id="title"
                  name="title"
                  required
                  value={formData.name}
                  className="py-2 text-3xl font-semibold outline-none cursor-pointer text-center"
                />
              </div>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={mediaUrl}
                className="hidden border border-gray-300 dark:text-white dark:bg-gray-700 dark:border-gray-600 p-2 rounded-3xl"
              />

              <div className="w-full relative">
                <input
                  id="body"
                  name="body"
                  value={formData.description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="py-2 text-xl outline-none cursor-pointer text-center"
                />
              </div>

              <div className="w-full relative">
                <input
                  id="body"
                  name="body"
                  value={formData.maxGuests}
                  onChange={(e) => setDescription(e.target.value)}
                  className="py-2 text-xl outline-none cursor-pointer text-center"
                />
              </div>

              <div className="w-full relative">
                <input
                  id="body"
                  name="body"
                  value={formData.price}
                  onChange={(e) => setDescription(e.target.value)}
                  className="py-2 text-xl outline-none cursor-pointer text-center"
                />
              </div>
            </div>

            <div className="flex gap-2 font-semibold p-2">
              <div className="text-xl">🌍</div>
              <div className="mt-0.5">
                {selectedCountry && selectedCountry.label}
              </div>
            </div>
          </div>

          <div className="flex px-6 pb-6 gap-4 mt-4">
            <button
              type="button"
              onClick={moveToPreviousStep}
              className="w-full border-2 border-gray-800 rounded-md font-semibold hover:bg-gray-800 hover:text-white transition duration-200 ease-in-out"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-b from-blue-600 to-blue-500 text-white font-semibold rounded-md transition duration-200 ease-in-out hover:opacity-80"
            >
              Post
            </button>
          </div>
        </div>
      </>
    );
  }

  useEffect(() => {
    if (!isModalOpen) {
      setStep(STEPS.CATEGORY);
    }
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
        >
          <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
            <div>
              <div className="h-full lg:h-auo md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-one">
                <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                  <button
                    className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                    onClick={closeModal}
                  >
                    <AiOutlineClose size={18} />
                  </button>
                  <div className="text-lg font-semibold">Create a listing</div>
                </div>
                {/* BODY */}
                {bodyContent}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
