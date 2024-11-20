const ShapeService = require('../services/ShapeService')

const createShape = async (req, res) => {
    try {
        const response = await ShapeService.createShape(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailShape = async (req, res) => {
    try {
        const shapeId = req.params.id
        if (!shapeId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await ShapeService.getDetailShape(shapeId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateShape = async (req, res) => {
    try {
        const shapeId = req.params.id
        const data = req.body
        if (!shapeId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await ShapeService.updateShape(shapeId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteShape = async (req, res) => {
    try {
        const shapeId = req.params.id
        if (!shapeId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await ShapeService.deleteShape(shapeId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createShape,
    getDetailShape,
    updateShape,
    deleteShape
}