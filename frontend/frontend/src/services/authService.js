import api from "./Api";

// Create society
export const createSociety = async (data) =>
  await api.post("http://localhost:5000/api/societies/create", data);

// Get all societies
export const getSocieties = async () =>
  await api.get("http://localhost:5000/api/societies/");

// Register
export const registerUser = async (data) =>
  await api.post("http://localhost:5000/api/v1/Registration", data);

// Login
export const loginUser = async (data) => await api.post("http://localhost:5000/api/v1/login", data);

// Logout
export const logoutUser = async () => await api.get("http://localhost:5000/api/v1/logout");

// Send otp
export const sendOtp = async (data) => await api.post("http://localhost:5000/api/v1/send-otp", data);

// Verify otp
export const verifyOtp = async (data) =>
  await api.post("http://localhost:5000/api/v1/verify-otp", data);

// Reset password
export const resetPassword = async (data) =>
  await api.post("http://localhost:5000/api/v1/reset-password", data);

// Update user profile
export const UpdateUserProfile = async (userId, data) => {
  const response = await api.patch(`http://localhost:5000/api/v1/edit/${userId}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
// View user profile
export const ViewUserProfile = async (userId) =>
  await api.get(`http://localhost:5000/api/v1/${userId}`);
