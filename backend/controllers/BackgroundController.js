const BackgroundService = require('../services/BackgroundService')

const createBackground = async (req, res) => {
    try {
        const response = await BackgroundService.createBackground(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllBackground = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await BackgroundService.getAllBackground(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createBackground,
    getAllBackground,
}