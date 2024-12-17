const Image = require('../models/ImageModel')
const ImageUpload = require('../models/ImageUploadModel')

const createImageUpload = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("data", data)
            const createdImageUpload = await ImageUpload.create({
                image: data.image,
                creator: data.id,
            })

            if(createdImageUpload){
                resolve({
                    status: "OK",
                    message: "Create success",
                    data: createdImageUpload
                })
            }
        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create Background",
                error: error.message,
            });
        }
    })
}

const createImage = (newImage) => {
    return new Promise(async (resolve, reject) => {
        const {x, y, height, width, image} = newImage;
        try {
            const createdImage = await Image.create({
                x, y, height, width, image // image: newImage.image,
            })

            if (createdImage) {
                resolve({
                    status: "OK", message: "Create success", data: createdImage
                })
            }

        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to create Image", error: error.message,
            });
        }
    })
}

const getDetailImage = (imageId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const image = await Image.findOne({
                _id: imageId
            })
            if (!Image) {
                resolve({
                    status: "ERROR", message: "Account is not defined!"
                })
                return;
            }

            resolve({
                status: "OK", message: "SUCCESS", data: image
            })

        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to create Image", error: error.message,
            });
        }
    })
}

const getAllImage = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allImage = await ImageUpload.find({creator: userId})
            resolve({
                status: "OK", message: "SUCCESS", data: allImage
            })
        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to get all Image", error: error.message,
            });
        }
    })
}

const updateImage = (imageId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkImage = await Image.findOne({
                _id: imageId
            })
            if (!checkImage) {
                resolve({
                    status: "ERROR", message: "Image is not defined!"
                })
                return;
            }
            const updatedImage = await Image.findByIdAndUpdate(imageId, data, {new: true});

            if (!updatedImage) {
                resolve({
                    status: "ERROR", message: "Image update failed or not found"
                });
                return;
            }

            resolve({
                status: "OK", message: "SUCCESS", data: updatedImage
            })

        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to update Image", error: error.message,
            });
        }
    })
}

const deleteImage = (imageId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const image = await Image.findOne({
                _id: imageId
            })
            if (!image) {
                resolve({
                    status: "ERROR", message: "Image is not defined!"
                })
                return;
            }
            await Image.findByIdAndDelete(imageId)

            resolve({
                status: "OK", message: "Delete success",
            })
        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to create Image", error: error.message,
            });
        }
    })
}


module.exports = {
    createImageUpload, createImage, getAllImage, getDetailImage, updateImage, deleteImage
}