import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Toaster, toast } from "sonner";
import gsap from "gsap";
import { createVenue } from "../../libs/api/Venues";
import { AiOutlineClose } from "react-icons/ai";
import Category from "./createvenue/Category";
import LocationDetailsForm from "./createvenue/LocationDetailsForm";
import MediaUrlInput from "./createvenue/MediaUrlInput";
import Information from "./createvenue/Information";

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
  const stepRef = useRef();
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleGuestChange = (guests) => {
    setFormData({
      ...formData,
      maxGuests: guests,
    });
  };

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection("next");
      gsap.to(stepRef.current, {
        opacity: 0,
        x: -100,
        duration: 0.5,
        onComplete: () => {
          setStep((prevStep) => prevStep + 1);
          setIsAnimating(false);
        },
      });
    }
  };

  const handlePrevious = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection(step > 0 ? "prev" : "firstBack");
      gsap.to(stepRef.current, {
        opacity: 0,
        x: step > 0 ? 100 : -100,
        duration: 0.5,
        onComplete: () => {
          setStep((prevStep) => prevStep - 1);
          setIsAnimating(false);
        },
      });
    }
  };

  useEffect(() => {
    if (!isAnimating) {
      const fromX =
        direction === "next"
          ? 100
          : direction === "prev"
          ? -100
          : direction === "firstBack"
          ? 100
          : 0;
      gsap.fromTo(
        stepRef.current,
        { opacity: 0, x: fromX },
        { opacity: 1, x: 0, duration: 0.5 }
      );
    }
  }, [step, direction, isAnimating]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lat" || name === "lng") {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [name]: parseFloat(value),
        },
      });
    } else if (name === "country") {
      // Update country separately
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          country: value,
        },
      });
    } else if (name === "city") {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          city: value,
        },
      });
    } else if (name === "mediaUrl") {
      // No need to update state here
    } else if (name === "price") {
      setFormData({
        ...formData,
        [name]: parseFloat(value),
      });
    } else {
      const updatedFormData = { ...formData, [name]: value };
      setFormData(updatedFormData);
    }

    // If name is mediaUrl and value is not empty, add the image URL to media array
    if (name === "mediaUrl" && value.trim() !== "") {
      setFormData({
        ...formData,
        media: [...formData.media, { url: value, alt: "" }],
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
      toast.success(`Listing Created`, {
        duration: 2000,
      });
      setModalOpen(false);
    } catch (error) {
      console.error("Error creating venue:", error);
      setError(error.message);
    }
  };

  useLayoutEffect(() => {
    if (isModalOpen && !hasOpened) {
      gsap.fromTo(
        "#single-venue",
        { y: "100%" }, // Start from the bottom
        { duration: 0.5, y: 0, ease: "power1.out" }
      );
      setHasOpened(true);
    }
  }, [isModalOpen, hasOpened]);

  const closeModal = () => {
    document
      .getElementById("modalBackground")
      .classList.remove("bg-neutral-800/50");

    gsap.to("#single-venue", {
      duration: 0.5,
      y: "100%",
      ease: "power3.in",
      onComplete: () => {
        setHasOpened(false);
        setModalOpen(false);
      },
    });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Category />;
      case 1:
        return (
          <LocationDetailsForm
            formData={formData}
            handleChange={handleChange}
            handlePositionChange={handlePositionChange}
          />
        );
      case 2:
        return (
          <MediaUrlInput
            mediaUrl={mediaUrl}
            handleChange={handleChange}
            handleAddImageUrl={handleAddImageUrl}
            handleRemoveImage={handleRemoveImage}
            media={formData.media}
          />
        );
      case 3:
        return (
          <Information
            formData={formData}
            handleGuestChange={handleGuestChange}
            handleMetaChange={handleMetaChange}
          />
        );
      case 4:
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
              How would you describe your home?
            </h1>
            <div className="text-sm md:text-base text-neutral-500 mt-2 mb-6">
              Short and sweet works best!
            </div>
            <div className="w-full relative mb-6">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition hover:border-gray-500 focus:border-gray-500 cursor-pointer"
              />
              <label
                className="
              text-gray-800
        absolute 
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
                Title (required)
              </label>
            </div>
            <div className="w-full relative mb-6">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="peer w-full p-4 pt-6 bg-white border-2 rounded-md outline-none transition hover:border-gray-500 focus:border-gray-500 cursor-pointer"
              />
              <label
                className="
              text-gray-00
        absolute 
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
                Description (required)
              </label>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              Pricing Details
            </h1>
            <div className="text-sm md:text-base text-neutral-500 mt-2">
              How much do you charge for a night?
            </div>
            <div className="w-full relative my-6">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition hover:border-gray-500 focus:border-gray-500 cursor-pointer"
              />
              <label
                className="
                text-gray-800
          absolute 
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
                Price (required)
              </label>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="mb-8">
            <h1 className="text-xl md:text-2xl font-semibold">
              Ready to share your space with the world?
            </h1>
            <div className="text-sm md:text-base text-neutral-500 mt-2">
              Remember, you can always come back to make adjustments.
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Toaster richColors />
      {isModalOpen && (
        <div
          id="modalBackground"
          className="flex justify-center items-center pt-6 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70"
        >
          <div
            id="single-venue"
            className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full"
          >
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
              <div className="p-6 relative flex-auto overflow-hidden">
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div ref={stepRef} className="relative">
                    {renderStep()}
                  </div>
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
                    {step === 4 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className={`w-full bg-gradient-to-b from-rose-400 to-rose-500 text-white p-4 rounded-md transition duration-200 ease-in-out hover:opacity-80 ${
                          (!formData.name || !formData.description) &&
                          "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!formData.name || !formData.description}
                      >
                        Next
                      </button>
                    )}
                    {step === 5 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className={`w-full bg-gradient-to-b from-rose-400 to-rose-500 text-white p-4 rounded-md transition duration-200 ease-in-out hover:opacity-80 ${
                          (!formData.price || isNaN(formData.price)) &&
                          "opacity-50 cursor-not-allowed"
                        }`}
                        disabled={!formData.price || isNaN(formData.price)}
                      >
                        Next
                      </button>
                    )}
                    {step !== 4 && step !== 5 && step < 6 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-full bg-gradient-to-b from-rose-400 to-rose-500 text-white p-4 rounded-md transition duration-200 ease-in-out hover:opacity-80"
                      >
                        Next
                      </button>
                    )}
                    {step === 6 && (
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-b from-rose-400 to-rose-500 text-white rounded-md p-4 transition duration-200 ease-in-out hover:opacity-80"
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
      )}
    </>
  );
};

export default CreateVenueModal;
