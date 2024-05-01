import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { useEffect, useState, useLayoutEffect } from "react";
import { getProfile } from "../../libs/api/Profiles";
import { fetchVenuesById } from "../../libs/api/Venues";
import Calendar from "../../components/calendar/Calendar";
import BookingForm from "../booking/BookingForm";

import { AiOutlineClose } from "react-icons/ai";

const SingleVenueModal = ({ isModalOpen, setModalOpen, venueId }) => {
  const [venue, setVenue] = useState(null);
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [hasOpened, setHasOpened] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [price, setPrice] = useState(0); // State for price
  const [maxGuests, setMaxGuests] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venueData = await fetchVenuesById(venueId);
        setVenue(venueData.data);

        setPrice(venueData.data.price);
        setMaxGuests(venueData.data.maxGuests);

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
            <div id="single-venue" className="flex w-full md:w-3/4 h-full">
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
                    <Link
                      to={`/profile?name=${ownerProfile.name}`}
                      onClick={() => setModalOpen(false)} // Close modal on profile link click
                    >
                      <p>{ownerProfile.name}</p>
                    </Link>
                  )}

                  {/* Display booked dates */}
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                      Booked Dates:
                    </h2>
                    <ul>
                      {bookedDates.length > 0 ? (
                        <div className="mb-4">
                          <ul>
                            {bookedDates.map((booking, index) => (
                              <li key={index}>
                                {booking.start.toLocaleDateString()} -{" "}
                                {booking.end.toLocaleDateString()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p>No booked dates</p>
                      )}
                    </ul>
                  </div>

                  <div>
                    <p>Price: ${price}</p>
                    <p>Max Guests: {maxGuests}</p>
                  </div>

                  {/* Booking form */}
                  <BookingForm venueId={venueId} />

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
