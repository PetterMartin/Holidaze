import { useEffect, useState } from "react";
import { fetchBookingsByProfile } from "../../libs/api";
import { useAuth } from "../auth/Auth";

function UsersBookings() {
  const searchParams = new URLSearchParams(window.location.search);
  const userName = searchParams.get("name");
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        if (userName && user) {
          const data = await fetchBookingsByProfile(userName);
          setBookings(data.data || []);
        } else {
          console.warn("User is not logged in.");
        }
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      }
    };

    fetchUserBookings();
  }, [userName, user]);

  return (
    <main className="container mx-auto lg:px-20 mt-4 text-black">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {bookings.map(({ id, dateFrom, dateTo, guests }) => (
          <div key={id} className="relative">
            <div className="overflow-hidden border p-4 rounded-3xl shadow-xl">
              <div className="flex flex-col gap-2 px-2">
                <div className="font-semibold text-xl text-gray-700 mt-3">
                  Booking ID: {id}
                </div>
                <div>Date From: {dateFrom}</div>
                <div>Date To: {dateTo}</div>
                <div>Guests: {guests}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default UsersBookings;