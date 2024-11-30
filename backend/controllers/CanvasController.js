const CanvasService = require('../services/CanvasService')
const mongoose = require('mongoose');

const createCanvas = async (req, res) => {
    try {
        const response = await CanvasService.createCanvas(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllCanvas = async (req, res) => {
    try {
        const projectId = req.params.id
        if (!projectId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await CanvasService.getAllCanvas(projectId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailCanvas = async (req, res) => {
    try {
        const canvasId = req.params.id
        if (!canvasId) {
            return res.status(400).json({
                error: 'Bad Request', message: 'Canvas ID is required'
            })
        }
        const response = await CanvasService.getDetailCanvas(canvasId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            error: 'Internal Server Error', message: e.message
        })
    }
}
const updateCanvas = async (req, res) => {
    try {
        const canvasId = req.params.id
        const data = req.body
        if (!canvasId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await CanvasService.updateCanvas(canvasId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteCanvas = async (req, res) => {
    try {
        const canvasId = req.params.id
        const projectId = req.body.projectId;
        if (!canvasId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await CanvasService.deleteCanvas(canvasId, projectId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const addComponentToCanvas = async (req, res) => {
    try {
        const canvasId = req.params.id;
        const { componentId } = req.body;

        if (!canvasId || !componentId) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Canvas ID and Component ID are required.'
            });
        }

        if (!mongoose.isValidObjectId(canvasId) || !mongoose.isValidObjectId(componentId)) {
            return res.status(400).json({
                status: 'ERROR',
                message: 'Invalid Canvas ID or Component ID.'
            });
        }

        const response = await CanvasService.addComponentToCanvas(canvasId, componentId);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while adding the component to the canvas.',
            error: e.message
        });
    }
};





module.exports = {
    createCanvas,
    getAllCanvas,
    updateCanvas,
    deleteCanvas,
    addComponentToCanvas,
    getDetailCanvas
}