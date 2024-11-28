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


module.exports = {
    createCanvas,
    getAllCanvas,
    updateCanvas,
    deleteCanvas
}