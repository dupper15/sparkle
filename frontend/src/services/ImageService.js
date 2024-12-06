import axios from "axios";

export const createImageUpload = async (data) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_KEY}/image/create-upload`, data);
        return response.data;
    } catch (error) {
        console.error('Failed to upload image properties:', error);
        throw error;
    }
};

export const getAllImage = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_KEY}/image/getAll/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to upload image properties:', error);
        throw error;
    }
};

const ImageService = {
    async createImage(imageData) {
        const response = await axios.post(`${import.meta.env.VITE_API_KEY}/image/create`, imageData);
        return response.data;
    },
    async updateImage(id, updatedData) {
        return axios.put(`${import.meta.env.VITE_API_KEY}/image/update/${id}`, updatedData)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error updating image:", error);
                throw error; // Re-throw the error to handle it in the component if needed
            });
    },
    async deleteImage(id) {
        return axios.delete(`${import.meta.env.VITE_API_KEY}/image/delete/${id}`)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error deleting image:", error);
                throw error; // Re-throw the error to handle it in the component if needed
            });
    },
};

export default ImageService;
