// frontend/src/services/ImageService.js

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