import axios from 'axios';

const ComponentService = {
    async addComponentToCanvas(canvasId, componentId) {
        const response = await axios.post(`${import.meta.env.VITE_API_KEY}/canvas/add-component/${canvasId}`, {componentId});
        return response.data;
    },
    async removeComponentFromCanvas(canvasId, componentId) {
        const response = await axios.post(`${import.meta.env.VITE_API_KEY}/canvas/remove-component/${canvasId}`, {componentId});
        return response.data;
    },
};

export default ComponentService;
