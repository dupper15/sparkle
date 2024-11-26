const Canvas = require('../models/CanvasModel')
const Project = require('../models/ProjectModel')

const createProject = (newProject) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createdCanvas = await Canvas.create({
                background: "#ffffff",
                componentArray: [],
            })
            const createdProject = await Project.create({
                canvasArray: [createdCanvas],
                projectName: newProject.projectName,
                owner: newProject.owner,
                editorArray: [],
                height: newProject.height,
                width: newProject.width,
            })
            if (createdProject) {
                resolve({
                    status: "OK",
                    message: "Create success",
                    data: createdProject,
                })
            } else {
                throw new Error('Project creation failed.');
            }

        } catch (error) {
            console.error("Error creating project:", error.message);
            reject({
                status: "ERROR",
                message: "Failed to create Project",
                error: error.message,
            });
        }
    })
}

const getDetailProject = (projectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const project = await Project.findOne({
                _id: projectId
            })
            if (!Project) {
                resolve({
                    status: "ERROR",
                    message: "Account is not defined!"
                })
                return;
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: project
            })

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create Project",
                error: error.message,
            });
        }
    })
}

const updateProject = (projectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProject = await Project.findOne({
                _id: projectId
            })
            if (!checkProject) {
                resolve({
                    status: "ERROR",
                    message: "Project is not defined!"
                })
                return;
            }

            const createdCanvas = await Canvas.create({
                background: "#ffffff",
                componentArray: [],
            })

            const canvasArray = [...checkProject.canvasArray, createdCanvas._id];

            const updatedProject = await Project.findByIdAndUpdate(projectId, {canvasArray}, {new: true});

            if (!updatedProject) {
                resolve({
                    status: "ERROR",
                    message: "Project update failed or not found"
                });
                return;
            }

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedProject
            })

        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to update Project",
                error: error.message,
            });
        }
    })
}

const deleteProject = (projectId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const project = await Project.findOne({
                _id: projectId
            })
            if (!project) {
                resolve({
                    status: "ERROR",
                    message: "Project is not defined!"
                })
                return;
            }
            await Project.findByIdAndDelete(projectId)

            resolve({
                status: "OK",
                message: "Delete success",
            })
        } catch (error) {
            reject({
                status: "ERROR",
                message: "Failed to create Project",
                error: error.message,
            });
        }
    })
}


module.exports = {
    createProject,
    getDetailProject,
    updateProject,
    deleteProject
}