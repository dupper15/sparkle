import axios from "axios";

export const getAllBackground = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_KEY}/background/getAll/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const createBackground = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/background/create`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};
