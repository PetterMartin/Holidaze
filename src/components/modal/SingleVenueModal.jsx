import { useEffect, useState, useLayoutEffect } from "react";
import { getProfile, fetchVenuesById, createBooking } from "../../libs/api";
import Calendar from "../../components/calendar/Calendar";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";

import { AiOutlineClose } from "react-icons/ai";

const SingleVenueModal = ({ isModalOpen, setModalOpen, venueId }) => {
  const [venue, setVenue] = useState(null);
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [hasOpened, setHasOpened] = useState(false);
  const [bookingData, setBookingData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venueData = await fetchVenuesById(venueId);
        setVenue(venueData.data);

        const ownerProfileData = await getProfile(venueData.data.owner.name);
        setOwnerProfile(ownerProfileData.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    if (isModalOpen && venueId) {
      fetchData();
    }
  }, [isModalOpen, venueId]);

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

  // Handle input change for booking data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  // Handle booking submission
  const handleBookingSubmit = async () => {
    try {
      // Send booking data to the API
      await createBooking({ ...bookingData, venueId });
      // Optionally, you can show a success message or perform other actions after successful booking
      console.log("Booking successful!");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <>
      {isModalOpen && venue && (
        <>
          <div
            id="modalBackground"
            className="fixed inset-0 flex items-center justify-end bg-neutral-800/50 overflow-hidden"
          >
            <div id="single-venue" className="flex w-3/4 h-full">
              <button
                id="closeButton"
                className="w-10 h-9 m-4 bg-white rounded-full flex items-center justify-center hover:bg-black"
                onClick={closeModal}
              >
                <AiOutlineClose size={14} className="text-black" />
              </button>

              <div className="w-full overflow-y-auto bg-white overflow-hidden shadow-lg relative">
                <div className="p-6">
                  <img
                    src={venue.media[0].url}
                    alt={venue.media[0].alt}
                    className="rounded-3xl mb-2 w-full h-96"
                  />
                  {ownerProfile && (
                    <Link to={`/profile?name=${ownerProfile.name}`}>
                      <p>{ownerProfile.name}</p>
                    </Link>
                  )}

                  {/* Booking form */}
                  <form
                    onSubmit={handleBookingSubmit}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="date"
                      name="dateFrom"
                      value={bookingData.dateFrom}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="Select Date From"
                    />
                    <input
                      type="date"
                      name="dateTo"
                      value={bookingData.dateTo}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="Select Date To"
                    />
                    <input
                      type="number"
                      name="guests"
                      value={bookingData.guests}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-md p-2"
                      placeholder="Number of Guests"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
                    >
                      Book Now
                    </button>
                  </form>

                  <Calendar />
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
