import { useState, useEffect } from "react";
import { createBooking } from "../../../libs/api/Bookings";
import DateModal from "../DateModal";
import GuestCounter from "../../buttons/GuestCounter";
import { BsFillCalendarMinusFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

const BookingForm = ({ venue }) => {
  const [bookingData, setBookingData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
  });
  const [message, setMessage] = useState("");
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState(null);
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceWithCleaningFee, setTotalPriceWithCleaningFee] = useState(0);

  const handleDateChange = (dates) => {
    console.log("Selected dates:", dates);
    const [dateFrom, dateTo] = dates.map((date) => date.format("YYYY-MM-DD"));
    setBookingData({ ...bookingData, dateFrom, dateTo });
    setSelectedDates(dates); // Update selected dates state
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Booking data before conversion:", bookingData);

      // Convert date values to ISO strings
      const bookingDataToSend = {
        ...bookingData,
        dateFrom: new Date(bookingData.dateFrom).toISOString(),
        dateTo: new Date(bookingData.dateTo).toISOString(),
        venueId: venue.id, // Access venue id directly from venue object
        guests: parseInt(bookingData.guests), // Convert guests to a number
      };

      console.log("Booking data after conversion:", bookingDataToSend);

      await createBooking(bookingDataToSend);
      setMessage("Booking successful!");
    } catch (error) {
      console.error("Error creating booking:", error);
      setMessage("Error creating booking. Please try again.");
    }
  };

  useEffect(() => {
    if (selectedDates && selectedDates.length === 2) {
      const nights = selectedDates[1].diff(selectedDates[0], "days");
      const price = nights * venue.price;
      const totalPriceWithCleaningFee = price + 35; // Add cleaning fee
      setTotalNights(nights);
      setTotalPrice(price); // Total price without cleaning fee
      setTotalPriceWithCleaningFee(totalPriceWithCleaningFee); // Total price with cleaning fee
    } else {
      setTotalNights(0);
      setTotalPrice(0);
      setTotalPriceWithCleaningFee(0);
    }
  }, [selectedDates, venue.price]);

  return (
    <form
      onSubmit={handleBookingSubmit}
      className="flex flex-col bg-gray-100 border rounded-xl p-6 gap-6 max-h-[500px]"
    >
      {showDateModal && (
        <div className="absolute top-40 left-0 ml-[-480px]">
          <DateModal
            onClose={() => setShowDateModal(false)}
            handleDateChange={handleDateChange}
          />
        </div>
      )}
      {venue && ( // Add conditional rendering here
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-700">
            ${venue.price.toFixed(0)}{" "}
            <span className="text-base text-gray-500 font-thin">/ night</span>
          </h1>
          <div className="flex gap-2 items-center">
            <FaStar size={14} />
            <div className="mt-1 text-sm">{venue.rating}.0</div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">Check In</p>
          <button
            type="button"
            onClick={() => setShowDateModal(true)}
            className="flex items-center gap-4 bg-white text-gray-700 py-2 px-4 rounded-lg border-2 border-white hover:border-rose-400 transition duration-300 ease-in-out"
            style={{ minWidth: "160px" }} // Set a fixed width for the button
          >
            <BsFillCalendarMinusFill size={16} />
            {selectedDates && selectedDates[0]
              ? selectedDates[0].format("YYYY/MM/DD")
              : "Start Date"}
          </button>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">Check Out</p>
          <button
            type="button"
            onClick={() => setShowDateModal(true)}
            className="flex items-center gap-4 bg-white text-gray-700 py-2 px-4 rounded-lg border-2 border-white hover:border-rose-400 transition duration-300 ease-in-out"
            style={{ minWidth: "160px" }} // Set a fixed width for the button
          >
            <BsFillCalendarMinusFill size={16} />
            {selectedDates && selectedDates[1]
              ? selectedDates[1].format("YYYY/MM/DD")
              : "End Date"}
          </button>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-400">Number of guests</p>
        <GuestCounter
          onGuestChange={(guests) => setBookingData({ ...bookingData, guests })}
        />
      </div>

      <div className="flex flex-col gap-2 border-t-2 border-b-2 text-sm">
        <div className="flex justify-between mt-6">
          <p>{totalNights} nights</p>
          <p>${totalPrice}</p>
        </div>
        <div className="flex justify-between mb-6">
          <p>Cleaning fee</p>
          <p>$35</p>
        </div>
      </div>

      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Total:</h1>
        <p className="text-lg font-semibold">${totalPriceWithCleaningFee}</p>
      </div>

      {/* Conditional rendering of DateModal */}

      <button
        type="submit"
        className="bg-gradient-to-b from-rose-400 to-rose-500 text-white py-3 px-4 mb-16 rounded-lg transition duration-300 ease-in-out hover:opacity-80"
      >
        Reserve
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
};

export default BookingForm;
