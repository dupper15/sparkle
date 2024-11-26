const Canvas = require('../models/CanvasModel')
const Project = require('../models/ProjectModel')

const createCanvas = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const createdCanvas = await Canvas.create({
                background,
                componentArray,
            })

            if(createdCanvas){
                resolve({
                    status: "OK",
                    message: "Create success",
                    data: {
                        Canvas: createdCanvas
                    }
                })
            }
        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create Canvas",
                error: error.message,
            });
        }
    })
}

const getDetailCanvas = (canvasId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const canvas = await Canvas.findOne({
                _id: canvasId
            })
            if (!Canvas){
                resolve({
                    status: "ERROR",
                    message: "Account is not defined!"
                })
                return;
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: canvas
            })

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create Canvas",
                error: error.message,
            });
        }
    })
}

const updateCanvas = (canvasId, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkCanvas = await Canvas.findOne({
                _id: canvasId
            })
            if (!checkCanvas){
                resolve({
                    status: "ERROR",
                    message: "Canvas is not defined!"
                })
                return;
            }
            const updatedCanvas = await Canvas.findByIdAndUpdate(canvasId, data, {new: true});

            if (!updatedCanvas){
                resolve({
                    status: "ERROR",
                    message: "Canvas update failed or not found"
                });
                return;
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedCanvas
            })

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to update Canvas",
                error: error.message,
            });
        }
    })
}

const deleteCanvas = (canvasId, projectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const canvas = await Canvas.findOne({
                _id: canvasId
            })
            if (!canvas){
                resolve({
                    status: "ERROR",
                    message: "Canvas is not defined!"
                })
                return;
            }
            await Canvas.findByIdAndDelete(canvasId)

            const project = await Project.findById(projectId);
            if (!project) {
                resolve({
                    status: "ERROR",
                    message: "Project not found!"
                });
                return;
            }
            const updatedCanvasArray = project.canvasArray.filter(
                (canvasItem) => canvasItem.toString() !== canvasId
            );
            project.canvasArray = updatedCanvasArray;
            await project.save();

            resolve({
                status: "OK",
                message: "Delete success",
            })
        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create Canvas",
                error: error.message,
            });
        }
    })
}


module.exports = {
    createCanvas,
    getDetailCanvas,
    updateCanvas,
    deleteCanvas
}