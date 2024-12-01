import axios from "axios";

export const uploadImage = async (imageId, properties) => {
    try {
        const response = await axios.post(`http://localhost:5001/api/images/upload/${imageId}`, properties);
        // console.log(`Notice: Image ID ${imageId} properties would be uploaded`, properties);
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
