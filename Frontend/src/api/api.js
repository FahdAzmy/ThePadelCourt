import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/api";
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
//Get Courts
export const getCourts = async () => {
  try {
    const respone = await axios.get(`${API_URL}/getcourts`);
    return respone.data;
  } catch (error) {
    console.error(
      "Error  Signup User",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
// Get Spacific Court
export const getCourt = async (id) => {
  try {
    const respone = await axios.get(`${API_URL}/court/${id}`);
    return respone.data;
  } catch (error) {
    console.error(
      "Error In Get Court",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Get User Profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/getuser`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in Get user",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
// change password
export const changePassaword = async (passwords) => {
  try {
    const response = await axios.post(`${API_URL}/changepassword`, passwords, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in Change Password",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// export const updateUserProfile = async (data) => {
//   return await axios.put("/api/profile", data); // Adjust the endpoint to match your API
// };
//Cancel Booking
export const CancelBooking = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/cancelbooking/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in Change Password",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
// Confirm Booking
export const ConfirmBooking = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/confirmbooking/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in Change Password",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
//Create Booking
export const CreateBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/createbooking`, bookingData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error in Change Password",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
