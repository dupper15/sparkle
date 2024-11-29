const CanvasService = require('../services/CanvasService')

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
        const response = await CanvasService.addComponentToCanvas(canvasId, componentId);
        return res.status(200).json(response);
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
    addComponentToCanvas
}