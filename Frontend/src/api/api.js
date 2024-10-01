import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
//Login User
export const Login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error Logging in User",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
// Sign Up User
export const Signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error  Signup User",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
