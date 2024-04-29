import { useState } from "react";
import { createBooking } from "../../libs/api/Bookings";

const BookingForm = ({ venueId }) => { 

    const [bookingData, setBookingData] = useState({
      dateFrom: "",
      dateTo: "",
      guests: 0,
    });
    const [message, setMessage] = useState("");
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setBookingData({ ...bookingData, [name]: value });
    };
  
    const handleBookingSubmit = async (e) => {
  e.preventDefault();
  try {
    // Convert date values to ISO strings
    const bookingDataToSend = {
        ...bookingData,
        dateFrom: new Date(bookingData.dateFrom).toISOString(),
        dateTo: new Date(bookingData.dateTo).toISOString(),
        venueId,
        guests: parseInt(bookingData.guests) // Convert guests to a number
      };

    await createBooking(bookingDataToSend);
    setMessage("Booking successful!");
  } catch (error) {
    console.error("Error creating booking:", error);
    setMessage("Error creating booking. Please try again.");
  }
};
  
    return (
      <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
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
        {message && <p className="text-red-500">{message}</p>}
      </form>
    );
  };
  
  export default BookingForm;