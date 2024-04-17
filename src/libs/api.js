import { apiUrl } from "./constants";

/**
 * Fetch all venues
 */
export async function fetchAllVenues() {
  try {
    const response = await fetch(`${apiUrl}/venues`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
    `${apiUrl}/venues/${venuesId}`
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


// Search
export async function searchVenues(query) {
  try {
    const response = await fetch(`${apiUrl}/venues/search?q=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
