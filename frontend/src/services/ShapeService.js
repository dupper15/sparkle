import axios from "axios";

export const uploadShape = async (properties) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_KEY}/shape/create`, properties);
        // console.log(`Notice: Shape ID ${shapeId} properties would be uploaded`, properties);
        return response.data;
    } catch (error) {
        console.error('Failed to upload shape properties:', error);
        throw error;
    }
};

export const updateShapeColor = async (shapeId, color) => {
    try {
        //const response = await axios.put(`http://localhost:3001/api/shapes/${shapeId}/color`, { color });
        console.log(`Notice: Shape ID ${shapeId} color would be updated to ${color}`);
        //return response.data;
    } catch (error) {
        console.error('Failed to update shape color:', error);
        throw error;
    }
};

export const updateShapeTransformation = async (shapeId, transformationType, value) => {
    try {
        //const response = await axios.put(`http://localhost:3001/api/shapes/${shapeId}/transformation`, { transformationType, value });
        console.log(`Notice: Shape ID ${shapeId} would be transformed with ${transformationType}: ${value}`);
        //return response.data;
    } catch (error) {
        console.error('Failed to update shape transformation:', error);
        throw error;
    }
};