import axios from "axios";

const API_URL = "http://localhost:5000/api/carbon-footprint"; // Adjust if needed

// ✅ Save Carbon Footprint
export const saveCarbonFootprint = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error saving carbon footprint:", error);
    throw error;
  }
};

// ✅ Fetch Carbon Footprint by User ID
export const getCarbonFootprint = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching carbon footprint:", error);
    throw error;
  }
};

// ✅ Update Carbon Footprint
export const updateCarbonFootprint = async (userId, data) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating carbon footprint:", error);
    throw error;
  }
};

// ✅ Delete Carbon Footprint
export const deleteCarbonFootprint = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting carbon footprint:", error);
    throw error;
  }
};
