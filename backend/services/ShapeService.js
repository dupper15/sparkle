const Shape = require('../models/ShapeModel')

const createShape = (newShape) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createdShape = await Shape.create({
                left: newShape.left,
                top: newShape.top,
                height: newShape.height,
                width: newShape.width,
                type_shape: newShape.width,
                color: "#000000"
            })
        
            if(createdShape){
                resolve({
                    status: "OK",
                    message: "Create success",
                    data: {
                        Shape: createdShape
                    }
                })
                return;
            }

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create Shape",
                error: error.message,
            });
        }
    })
}

const getDetailShape = (shapeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const shape = await Shape.findOne({
                _id: shapeId
            })
            if (!Shape){
                resolve({
                    status: "ERROR",
                    message: "Account is not defined!"
                })
                return;
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: shape
            })

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create Shape",
                error: error.message,
            });
        }
    })
}

const updateShape = (shapeId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkShape = await Shape.findOne({
                _id: shapeId
            })
            if (!checkShape){
                resolve({
                    status: "ERROR",
                    message: "Shape is not defined!"
                })
                return;
            }
            const updatedShape = await Shape.findByIdAndUpdate(shapeId, data, {new: true});

            if (!updatedShape){
                resolve({
                    status: "ERROR",
                    message: "Shape update failed or not found"
                });
                return;
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedShape
            })

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to update Shape",
                error: error.message,
            });
        }
    })
}

const deleteShape = (shapeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const shape = await Shape.findOne({
                _id: shapeId
            })
            if (!shape){
                resolve({
                    status: "ERROR",
                    message: "Shape is not defined!"
                })
                return;
            }
            await Shape.findByIdAndDelete(shapeId)

            resolve({
                status: "OK",
                message: "Delete success",
            })
        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create Shape",
                error: error.message,
            });
        }
    })
}


module.exports = {
    createShape,
    getDetailShape,
    updateShape,
    deleteShape
}