import axios from "axios";

const ShapeService = {
  async createShape(shapeData) {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/shape/create`,
      shapeData
    );
    return response.data;
  },
  async updateShape(id, updatedData) {
    return axios
      .put(`${import.meta.env.VITE_API_KEY}/shape/update/${id}`, updatedData)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error updating shape:", error);
        throw error;
      });
  },
  async deleteShape(id) {
    return axios
      .delete(`${import.meta.env.VITE_API_KEY}/shape/delete/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error deleting shape:", error);
        throw error;
      });
  },
};

export default ShapeService;
