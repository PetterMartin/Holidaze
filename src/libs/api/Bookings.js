import { apiUrl } from "../constants";

/**
 * Fetch all bookings made by a specific profile
 */
export async function fetchBookingsByProfile(userName) {
    const url = new URL(
      `${apiUrl}/holidaze/profiles/${userName}/bookings?_customer=true&_venue=true`
    );
  
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY
      },
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
  
      if (response.ok) {
        return data;
      } else {
        console.error(`Failed to fetch user bookings. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    }
  }
  
  /**
   * Create a new booking
   */
  export async function createBooking(bookingData) {
    const url = `${apiUrl}/holidaze/bookings`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "X-Noroff-API-Key": import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify(bookingData)
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data)
  
      if (response.ok) {
        return data;
      } else {
        throw new Error(`Failed to create booking. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }