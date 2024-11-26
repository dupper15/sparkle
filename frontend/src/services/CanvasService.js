import axios from "axios";

export const deleteCanvas = async (id, data) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_KEY}/canvas/delete/${id}`, {
        data: {projectId: data}
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'API call failed');
    }
};