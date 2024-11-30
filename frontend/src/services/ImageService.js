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
};

export default ImageService;
