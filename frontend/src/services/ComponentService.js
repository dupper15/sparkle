import axios from 'axios';

const ComponentService = {
    async addComponentToCanvas(canvasId, componentId) {
        const response = await axios.post(`${import.meta.env.VITE_API_KEY}/canvas/addComponent/${canvasId}`, { componentId });
        return response.data;
    },
};

export default ComponentService;
