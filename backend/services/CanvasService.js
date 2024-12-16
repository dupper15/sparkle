const Canvas = require('../models/CanvasModel')
const Project = require('../models/ProjectModel')
const Component = require('../models/ComponentModel')

const createCanvas = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const createdCanvas = await Canvas.create({
                background, componentArray,
            })

            if (createdCanvas) {
                resolve({
                    status: "OK", message: "Create success", data: {
                        Canvas: createdCanvas
                    }
                })
            }
        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to create Canvas", error: error.message,
            });
        }
    })
}

const getAllCanvas = (projectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const project = await Project.findById(projectId).populate({
                path: 'canvasArray', populate: {
                    path: 'componentArray', model: 'Component', populate: [{
                        path: 'image', model: 'ImageUpload'
                    }, {
                        path: 'text', model: 'Text'
                    }, {
                        path: 'shape', // Replace with actual component type
                        model: 'Shape' // Replace with actual model name
                    }]
                }
            });
            if (!project) {
                resolve({
                    status: "ERROR", message: "Project is not defined!"
                })
                return;
            }

            resolve({
                status: "OK", message: "SUCCESS", data: project.canvasArray
            })

        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to create Canvas", error: error.message,
            });
        }
    })
}

const getDetailCanvas = (canvasId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const canvas = await Canvas.findById(canvasId).populate({
                path: 'canvasArray', populate: {
                    path: 'componentArray', model: 'Component', populate: [{
                        path: 'image', model: 'ImageUpload'
                    }, {
                        path: 'text', model: 'Text'
                    }, {
                        path: 'shape', // Replace with actual component type
                        model: 'Shape' // Replace with actual model name
                    }]
                }
            });
            if (!canvas) {
                resolve({
                    status: "ERROR", message: "Canvas is not defined!"
                })
                return;
            }

            resolve({
                status: "OK", message: "SUCCESS", data: canvas.canvasArray
            })

        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to get Canvas", error: error.message,
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
            if (!checkCanvas) {
                resolve({
                    status: "ERROR", message: "Canvas is not defined!"
                })
                return;
            }
            const updatedCanvas = await Canvas.findByIdAndUpdate(canvasId, {background: data.background}, {new: true});

            if (!updatedCanvas) {
                resolve({
                    status: "ERROR", message: "Canvas update failed or not found"
                });
                return;
            }

            resolve({
                status: "OK", message: "SUCCESS", data: updatedCanvas
            })

        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to update Canvas", error: error.message,
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
            if (!canvas) {
                resolve({
                    status: "ERROR", message: "Canvas is not defined!"
                })
                return;
            }
            const project = await Project.findById(projectId);
            if (!project) {
                resolve({
                    status: "ERROR", message: "Project not found!"
                });
                return;
            }
            await Project.findOneAndDelete({canvasArray: { $in: [projectId]}})

            await Canvas.findByIdAndDelete(canvasId)
            resolve({
                status: "OK", message: "Delete success",
            })
        } catch (error) {
            reject({
                status: "ERROR", message: "Failed to create Canvas", error: error.message,
            });
        }
    })
}

const addComponentToCanvas = async (canvasId, component) => {
    try {
        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            return {
                status: "ERROR", message: "Canvas not found!"
            };
        }

        const componentExists = await Component.findById(component);
        if (!componentExists) {
            return {
                status: "ERROR", message: "Component not found!"
            };
        }

        canvas.componentArray.push(component);
        await canvas.save();
        const updatedCanvas = await Canvas.findById(canvasId).populate('componentArray');

        return {
            status: "OK", message: "Component added successfully.", data: updatedCanvas
        };
    } catch (error) {
        return {
            status: "ERROR", message: "Failed to add component to canvas.", error,
        };
    }
};

const removeComponentFromCanvas = async (canvasId, componentId) => {
    try {
        const canvas = await Canvas.findById(canvasId);
        if (!canvas) {
            return {
                status: "ERROR", message: "Canvas not found!"
            };
        }

        const componentExists = await Component.findById(componentId);
        if (!componentExists) {
            return {
                status: "ERROR", message: "Component not found!"
            };
        }

        canvas.componentArray = canvas.componentArray.filter((component) => component.toString() !== componentId);
        await canvas.save();

        return {
            status: "OK", message: "Component removed successfully."
        };
    } catch (error) {
        return {
            status: "ERROR", message: "Failed to remove component from canvas.", error,
        };
    }
}

const getComponentsByCanvasId = (canvasId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const canvas = await Canvas.findById(canvasId).populate('componentArray');
            if (!canvas) {
                resolve({
                    status: "ERROR",
                    message: "Canvas not found!"
                });
                return;
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: canvas.componentArray
            });
        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to retrieve components",
                error: error.message,
            });
        }
    });
};


module.exports = {
    createCanvas, getAllCanvas, updateCanvas, deleteCanvas, addComponentToCanvas, removeComponentFromCanvas, getDetailCanvas, getComponentsByCanvasId
}