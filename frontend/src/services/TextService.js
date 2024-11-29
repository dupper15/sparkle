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

export const uploadTextProperties = async (textId, properties) => {
    try {
        //const response = await axios.post(`http://localhost:3001/api/texts/${textId}/upload`, properties);
        console.log(`Notice: Text ID ${textId} properties would be uploaded`, properties);
        //return response.data;
    } catch (error) {
        console.error('Failed to upload text properties:', error);
        throw error;
    }
};