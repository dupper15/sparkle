import axios from "axios";

export const deleteCanvas = async (id, data) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_KEY}/canvas/delete/${id}`,
      {
        data: { projectId: data },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const updateCanvas = async (id, data) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_KEY}/canvas/update/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};

export const getAllCanvas = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_KEY}/canvas/getAll/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "API call failed");
  }
};
export const getCanvasDetails = async (id) => {
    try {
        const response = await axios.get(
        `${import.meta.env.VITE_API_KEY}/canvas/get-detail/${id}`
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "API call failed");
    }
}
