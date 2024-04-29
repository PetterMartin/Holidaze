import { apiUrl } from "../constants";

/**
 * Fetch all venues
 */
export async function fetchAllVenues() {
  try {
    const response = await fetch(
      `${apiUrl}/holidaze/venues?sort=created&sortOrder=desc`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Failed to fetch venues. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching venues:", error);
  }
}

export async function fetchVenuesById(venuesId) {
  const url = new URL(
    `${apiUrl}/holidaze/venues/${venuesId}?_owner=true&_bookings=true`
  );

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Failed to fetch. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching listing:", error);
  }
}

/**
 * Fetch venues created by a specific profile
 */
export async function fetchVenuesByProfile(userName) {
  const url = new URL(`${apiUrl}/holidaze/profiles/${userName}/venues`);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      return data.data || [];
    } else {
      console.error(`Failed to fetch user venues. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching user venues:", error);
    return [];
  }
}

/**
 * Create a new venue
 */
export async function createVenue(venueData) {
  const url = `${apiUrl}/holidaze/venues`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify(venueData),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(`Failed to create venue. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error creating venue:", error);
    throw error;
  }
}

/**
 * Update a venue
 */
export async function updateVenue(venueId, venueData) {
  const url = `${apiUrl}/holidaze/venues/${venueId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify(venueData),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error(`Failed to update venue. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating venue:", error);
    throw error;
  }
}

/**
 * Delete a venue
 */
export async function deleteVenue(venueId) {
  const url = `${apiUrl}/holidaze/venues/${venueId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      console.log(`Venue with ID ${venueId} deleted successfully`);
    } else {
      throw new Error(`Failed to delete venue. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting venue:", error);
    throw error;
  }
}

// Search
export async function searchVenues(query) {
  try {
    const response = await fetch(
      `${apiUrl}/holidaze/venues/search?q=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Failed to search venues. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error searching venues:", error);
  }
}
