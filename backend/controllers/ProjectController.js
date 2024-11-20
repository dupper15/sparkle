const ProjectService = require('../services/ProjectService')

const createProject = async (req, res) => {
    try {
        const response = await ProjectService.createProject(req.body)
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
        const response = await ProjectService.updateProject(projectId, data)
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