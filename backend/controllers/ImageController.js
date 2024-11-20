const ImageService = require('../services/ImageService')
const cloudinary = require('../utils/cloudinary')
const ImageUpload = require('../models/ImageUploadModel')

const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(image, {
            folder: "image_Sparkle"
        })
        const userId = req.params.id;
        const uploadedImage = await ImageUpload.create({
            image: result.secure_url,
            creator: userId
        })
        return res.status(200).json({
            status: "OK",
            message: "Upload image success",
            data: uploadedImage
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const getAllImage = async (req, res) => {
    try {
        const userId = req.params.id
        const response = await ImageService.getAllImage(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createImage = async (req, res) => {
    try {
        const response = await ImageService.createImage(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailImage = async (req, res) => {
    try {
        const imageId = req.params.id
        if (!imageId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await ImageService.getDetailImage(imageId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateImage = async (req, res) => {
    try {
        const imageId = req.params.id
        const data = req.body
        if (!imageId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await ImageService.updateImage(imageId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteImage = async (req, res) => {
    try {
        const imageId = req.params.id
        if (!imageId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await ImageService.deleteImage(imageId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createImage,
    uploadImage,
    getAllImage,
    getDetailImage,
    updateImage,
    deleteImage
}