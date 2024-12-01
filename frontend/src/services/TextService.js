import axios from "axios";

export const uploadText = async (textId, properties) => {
    try {
        const response = await axios.post(`http://localhost:5001/api/texts/${textId}/upload`, properties);
        // console.log(`Notice: Text ID ${textId} properties would be uploaded`, properties);
        return response.data;
    } catch (error) {
        console.error('Failed to upload text properties:', error);
        throw error;
    }
};

export const updateTextColor = async (textId, color) => {
    try {
        //const response = await axios.put(`http://localhost:3001/api/texts/${textId}/color`, { color });
        console.log(`Notice: Text ID ${textId} color would be updated to ${color}`);
        //return response.data;
    } catch (error) {
        console.error('Failed to update text color:', error);
        throw error;
    }
};

export const updateTextTransformation = async (textId, transformationType, value) => {
    try {
        //const response = await axios.put(`http://localhost:3001/api/texts/${textId}/transformation`, { transformationType, value });
        console.log(`Notice: Text ID ${textId} would be transformed with ${transformationType}: ${value}`);
        //return response.data;
    } catch (error) {
        console.error('Failed to update text transformation:', error);
        throw error;
    }
};

const TextService = {
    async createText(textData) {
        const response = await axios.post(`${import.meta.env.VITE_API_KEY}/texts`, textData);
        return response.data;
    },
    async updateText(id, updatedData) {
        return axios.put(`${import.meta.env.VITE_API_KEY}/texts/${id}`, updatedData)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error updating text:", error);
                throw error; // Re-throw the error to handle it in the component if needed
            });
    },
    async deleteText(id) {
        return axios.delete(`${import.meta.env.VITE_API_KEY}/texts/${id}`)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error deleting text:", error);
                throw error; // Re-throw the error to handle it in the component if needed
            });
    },
};

export default TextService;
