import { apiUrl } from "../constants";

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