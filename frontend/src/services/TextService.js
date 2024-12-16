import axios from "axios";

const TextService = {
    async createText(textData) {
        const response = await axios.post(`${import.meta.env.VITE_API_KEY}/text/create`, textData);
        return response.data;
    },
    async updateText(id, updatedData) {
        return axios.put(`${import.meta.env.VITE_API_KEY}/text/update/${id}`, updatedData)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error updating text:", error);
                throw error; // Re-throw the error to handle it in the text if needed
            });
    },
    async deleteText(id) {
        return axios.delete(`${import.meta.env.VITE_API_KEY}/text/delete/${id}`)
            .then((response) => response.data)
            .catch((error) => {
                console.error("Error deleting text:", error);
                throw error; // Re-throw the error to handle it in the text if needed
            });
    },
    async updateTextFontFamily(fontFamily, textId) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_KEY}/text/update/${textId}`, { fontFamily });
            return response.data;
        } catch (error) {
            console.error('Failed to update text font family:', error);
            throw error;
        }
    },
    async updateTextFontSize(fontSize, textId) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_KEY}/text/update/${textId}`, { fontSize });
            return response.data;
        } catch (error) {
            console.error('Failed to update text font size:', error);
            throw error;
        }
    },
    async updateTextFontWeight(fontWeight, textId) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_KEY}/text/update/${textId}`, { fontWeight });
            return response.data;
        } catch (error) {
            console.error('Failed to update text font weight:', error);
            throw error;
        }
    },
    async updateTextFontStyle( fontStyle, textId) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_KEY}/text/update/${textId}`, { fontStyle });
            return response.data;
        } catch (error) {
            console.error('Failed to update text font style:', error);
            throw error;
        }
    },
    async updateTextDecorationLine(textDecorationLine, textId) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_KEY}/text/update/${textId}`, { textDecorationLine });
            return response.data;
        } catch (error) {
            console.error('Failed to update text decoration line:', error);
            throw error;
        }
    },
    async updateTextTextAlign(textAlign, textId) {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_KEY}/text/update/${textId}`, { textAlign });
            return response.data;
        } catch (error) {
            console.error('Failed to update text text align:', error);
            throw error;
        }
    }
};

export default TextService;
