import { gsap } from "gsap";
import { useEffect, useState, useLayoutEffect } from "react";
import useVenueData from "../../../hooks/useVenuesById";
import BookingForm from "./BookingForm";
import LikeButton from "../../buttons/LikeButton";
import GoogleMaps from "../../calendar/GoogleMaps";
import LocationDetails from "./LocationDetails";
import VenuesFeatures from "./VenuesFeatures";
import Host from "./Host";

import { AiOutlineClose, AiFillFlag } from "react-icons/ai";
import { FaShower, FaUsers } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { LuShare } from "react-icons/lu";
import { MdBedroomChild } from "react-icons/md";

const SingleVenueModal = ({ isModalOpen, setModalOpen, venueId }) => {
  const { venue, ownerProfile } = useVenueData(venueId, isModalOpen);

  const [selectedImage, setSelectedImage] = useState(0);
  const [hasOpened, setHasOpened] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleImageClick = (index) => {
    const temp = venue.media[0];
    venue.media[0] = venue.media[index];
    venue.media[index] = temp;
    setSelectedImage(index);
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      if (!isModalOpen) {
        document.body.style.overflow = "auto";
      }
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [isModalOpen]);

  // Animate modal when it initially appears
  useLayoutEffect(() => {
    if (isModalOpen && venue && !hasOpened) {
      gsap.fromTo(
        "#single-venue",
        { x: "100%" },
        { duration: 0.5, x: 0, ease: "power2.inOut" }
      );
      setHasOpened(true); // Update the flag
    }
  }, [isModalOpen, venue, hasOpened]);

  // Animate modal out when it closes
  const closeModal = () => {
    document
      .getElementById("modalBackground")
      .classList.remove("bg-neutral-800/50");

    gsap.to("#single-venue", {
      duration: 0.5,
      x: "100%",
      ease: "power2.inOut",
      onComplete: () => {
        setHasOpened(false);
        setModalOpen(false);
      },
    });
  };

  useEffect(() => {
    if (venue && venue.bookings) {
      const dates = venue.bookings.map((booking) => ({
        start: new Date(booking.dateFrom),
        end: new Date(booking.dateTo),
      }));
      setBookedDates(dates);
    }
  }, [venue]);

  return (
    <>
      {isModalOpen && venue && (
        <>
          <div
            id="modalBackground"
            className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-800/50 overflow-hidden"
          >
            <div id="single-venue" className="flex w-full xl:w-4/5 h-full">
              <div className="hidden xl:block">
                <button
                  id="closeButton"
                  className="w-9 h-9 m-4 bg-white border-2 rounded-full flex items-center justify-center transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-700 hover:text-white"
                  onClick={closeModal}
                >
                  <FaArrowLeft size={14} className="text-black" />
                </button>
              </div>

              <div className="w-full overflow-y-auto bg-white overflow-hidden shadow-lg relative">
                <div className="block xl:hidden">
                  <button
                    id="closeButton"
                    className="w-10 h-9 m-4 bg-white rounded-full flex items-center justify-center hover:bg-black"
                    onClick={closeModal}
                  >
                    <FaArrowLeft size={14} className="text-black" />
                  </button>
                </div>
                <div className="ps-8 pe-4">
                  <div className="flex flex-col md:flex-row py-8 gap-4">
                    <div className="w-full h-[35vh] md:h-[65vh] overflow-hidden rounded-3xl relative">
                      <img
                        src={venue.media[0].url}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-5 left-5 bg-white py-1.5 px-3 rounded-xl text-sm border-2 cursor-pointer transition duration-200 ease-in-out hover:bg-gray-700 hover:border-gray-700 hover:text-white">
                        View All Photos
                      </div>
                    </div>
                    {venue.media && venue.media.length > 1 && (
                      <div
                        className={`w-2/3 ${
                          venue.media.length > 2 ? "flex-col" : ""
                        }`}
                      >
                        {venue.media.slice(1, 3).map((image, index) => (
                          <div
                            key={index}
                            className="w-full overflow-hidden rounded-3xl cursor-pointer mb-4 hidden md:block"
                            onClick={() => handleImageClick(index + 1)}
                          >
                            <img
                              src={image.url}
                              alt=""
                              className={`object-cover w-full ${
                                venue.media.length === 2
                                  ? "h-full"
                                  : "h-[235px]"
                              } transform transition-transform duration-200 hover:scale-110`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Display booked dates */}
                  <div className="flex flex-col md:flex-row justify-between">
                    {/* Left Side */}
                    <div className="w-full flex flex-col gap-2 me-8">
                      <div className="flex justify-between">
                        <h1 className="text-xl md:text-4xl">
                          {venue.name.charAt(0).toUpperCase() +
                            venue.name.slice(1)}
                        </h1>
                        <div className="flex items-center gap-4">
                          <div className="bg-gray-100 rounded-full p-2 hover:bg-gray-800 hover:text-white cursor-pointer">
                            <LuShare />
                          </div>
                          <LikeButton />
                        </div>
                      </div>

                      <h2 className="text-sm md:text-lg text-gray-500">
                        <LocationDetails venue={venue} />
                      </h2>

                      <div className="flex gap-8 border-b pt-6 pb-8">
                        <div className="flex items-center gap-3">
                          <FaUsers size={20} />
                          <p>{venue.maxGuests} guests</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <MdBedroomChild size={22} />
                          <p>2 bedrooms</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <IoBed size={20} />
                          <p>4 beds</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <FaShower size={20} />
                          <p>2 bathrooms</p>
                        </div>
                      </div>

                      <VenuesFeatures venue={venue} />

                      <div className="flex flex-col gap-3 py-6 relative">
                        <h1 className="text-xl font-semibold">
                          About this space
                        </h1>
                        <div
                          style={{
                            maxHeight: showFullDescription ? "none" : "130px",
                            overflow: "hidden",
                          }}
                        >
                          <div className="relative">
                            <p className="text-gray-500">{venue.description}</p>
                            {!showFullDescription &&
                              venue.description.length > 200 && (
                                <div
                                  className="absolute bottom-0 left-0 w-full"
                                  style={{ zIndex: 1 }}
                                >
                                  <div
                                    className="h-20 bg-gradient-to-t from-white via-white to-transparent"
                                    style={{
                                      position: "absolute",
                                      bottom: 0,
                                      left: 0,
                                      width: "100%",
                                    }}
                                  />
                                </div>
                              )}
                          </div>
                        </div>
                        {!showFullDescription &&
                          venue.description.length > 200 && (
                            <p
                              className="text-rose-500 font-semibold hover:underline cursor-pointer"
                              onClick={() => setShowFullDescription(true)}
                            >
                              Read more
                            </p>
                          )}
                      </div>
                      <div className="flex flex-col border-t border-b">
                        <h1 className="text-xl font-semibold py-8">
                          Where you'll be
                        </h1>
                        <GoogleMaps venue={venue} />
                        <p className="text-lg py-6">
                          <LocationDetails venue={venue} />
                        </p>
                      </div>

                      <Host ownerProfile={ownerProfile} />
                    </div>

                    {/* Right Side */}
                    <div className="sticky flex flex-col items-center gap-2 top-0 h-full pt-4">
                      <BookingForm venue={venue} venueId={venueId} />
                      <div className="flex items-center gap-3 text-gray-600">
                        <AiFillFlag size={18} />
                        <p className="text-sm font-semibold mt-1 underline cursor-pointer">
                          Report this listing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleVenueModal;
