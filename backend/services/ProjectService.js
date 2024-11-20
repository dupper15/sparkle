const Project = require('../models/ProjectModel')

const createProject = (newProject) => {
    return new Promise(async (resolve, reject) => {
        try {
            const createdProject = await Project.create({
                userArray: newProject.userArray,
                canvasArray: newProject.canvasArray,
                projectName: newProject.projectName,
                owner: newProject.owner,
                editorArray: newProject.editorArray,
                isPublic: newProject.isPublic,
                height: newProject.height,
                width: newProject.width,
            })

            if (createdProject) {
                resolve({
                    status: "OK",
                    message: "Create success",
                    data: {
                        Project: createdProject
                    }
                })
                //return; //Unnecessary
            }

        } catch (error) {
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

const updateProject = (projectId, data) => {
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
            const updatedProject = await Project.findByIdAndUpdate(projectId, data, {new: true});

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