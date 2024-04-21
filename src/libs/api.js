import { apiUrl } from "./constants";

/**
 * Fetch all venues
 */
export async function fetchAllVenues() {
  try {
    const response = await fetch(`${apiUrl}/holidaze/venues?sort=created&sortOrder=desc`, {
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
    `${apiUrl}/holidaze/venues/${venuesId}`
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
    const response = await fetch(`${apiUrl}/holidaze/venues/search?q=${query}`, {
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

/** * Register User */
export async function registerUser({ email, password, username, avatar, banner }) {
  const url = new URL(`${apiUrl}/auth/register`);

  const userData = {
    name: username,
    email,
    password,
    avatar,
    banner,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(userData),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    localStorage.setItem("jwt", data.accessToken);
    localStorage.setItem("user_name", data.userId);
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/** * Login User  */
export async function loginUser(email, password) {
  const url = new URL(`${apiUrl}/auth/login`);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    window.localStorage.setItem("jwt", data.data.accessToken);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

/** * Get Profile  */
export async function getProfile(userName) {
  const apiUser = `${apiUrl}/holidaze/profiles/${userName}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY
    },
  };

  try {
    const response = await fetch(apiUser, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile. Status: ${response.status}`);
    }

    const userProfile = await response.json(); 
    return userProfile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

/** * Update Profile  */
export async function updateProfile(userName, updatedData, token) {
  const URL = `${apiUrl}/holidaze/profiles/${userName}`;
  const response = await fetch(URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": import.meta.env.VITE_API_KEY
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update profile. Status: ${response.status}`);
  }

  return response.json();
}
