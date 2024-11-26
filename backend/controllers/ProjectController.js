const ProjectService = require('../services/ProjectService')

const createProject = async (req, res) => {
    try {
        const userId = req.params.id; 
        const { projectName, height, width} = req.body
        if (!projectName || !height || !width){
            return res.status(400).json({
                status: "ERROR",
                message: "The input is required"
            })
        }
        const newProject = {
            owner: userId, // Truyền ID người dùng vào trường owner
            projectName: projectName,
            height: height,
            width: width,
        };
        const response = await ProjectService.createProject(newProject)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailProject = async (req, res) => {
    try {
        const projectId = req.params.id
        if (!projectId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await ProjectService.getDetailProject(projectId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProject = async (req, res) => {
    try {
        const projectId = req.params.id
        const data = req.body
        if (!projectId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await ProjectService.updateProject(projectId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id
        if (!projectId){
            return res.status(400).json({
                status: 'ERROR',
                message: 'Id is not defined'
            })
        }
        const response = await ProjectService.deleteProject(projectId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createProject,
    getDetailProject,
    updateProject,
    deleteProject
}