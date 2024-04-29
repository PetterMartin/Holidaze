import { apiUrl } from "../constants";

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