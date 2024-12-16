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
    async updateComponentColor(componentType, propertyValue, componentId) {
        const response = await axios.put(`${import.meta.env.VITE_API_KEY}/${componentType}/update/${componentId}`, {color : propertyValue});
        return response.data;
    },
    async updateComponentZIndex(componentType, propertyValue, componentId) {
        const response = await axios.put(`${import.meta.env.VITE_API_KEY}/${componentType}/update/${componentId}`, {zIndex : propertyValue});
        return response.data;
    }
};

export default ComponentService;
