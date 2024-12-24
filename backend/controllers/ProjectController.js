const ProjectService = require("../services/ProjectService");
const User = require("../models/UserModel");
const Project = require("../models/ProjectModel");
const createProject = async (req, res) => {
  try {
    const userId = req.params.id;
    const { projectName, height, width } = req.body;
    if (!projectName || !height || !width) {
      return res.status(400).json({
        status: "ERROR",
        message: "The input is required",
      });
    }
    const newProject = {
      owner: userId,
      projectName: projectName,
      height: height,
      width: width,
    };
    const response = await ProjectService.createProject(newProject);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getDetailProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    if (!projectId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ProjectService.getDetailProject(projectId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllProject = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ProjectService.getAllProject(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getAllTeamProject = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ProjectService.getAllTeamProject(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getPublic = async (req, res) => {
  try {
    const response = await ProjectService.getPublic();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    if (!projectId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ProjectService.updateProject(projectId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const addProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const data = req.body;
    if (!projectId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ProjectService.addProject(projectId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updatePublic = async (req, res) => {
  try {
    const projectId = req.params.id;
    if (!projectId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ProjectService.updatePublic(projectId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const updatePrivate = async (req, res) => {
  try {
    const projectId = req.params.id;
    if (!projectId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ProjectService.updatePrivate(projectId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    if (!projectId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ProjectService.deleteProject(projectId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const addEditor = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { email } = req.body;
    console.log(projectId, email);
    if (!projectId || !email) {
      return res.status(400).json({
        status: "ERROR",
        message: "Project ID or Email is missing",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "ERROR",
        message: "User with this email does not exist",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        status: "ERROR",
        message: "Project not found",
      });
    }

    if (project.editorArray.includes(email)) {
      return res.status(400).json({
        status: "ERROR",
        message: "This email is already an editor",
      });
    }

    project.editorArray.push(email);
    await project.save();

    return res.status(200).json({
      status: "OK",
      message: "Editor added successfully",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: "Something went wrong",
      error: error.stack,
    });
  }
};
const getAvatar = async (req, res) => {
  try {
    const { usersInRoom } = req.body;
    const avatars = [];
    for (const userId of usersInRoom) {
      const user = await User.findById(userId);
      if (user && user.image) {
        avatars.push(user.image);
      } else {
        console.log(`Không tìm thấy user hoặc avatar cho ID: ${userId}`);
      }
    }
    return res.status(200).json({ avatars });
  } catch (error) {
    return res.status(500).json({
      message: "Error loading avatars",
      error: error.stack,
    });
  }
};

const renameProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const projectName = req.body;
    console.log(projectId, projectName);
    if (!projectId) {
      return res.status(400).json({
        status: "ERROR",
        message: "Id is not defined",
      });
    }
    const response = await ProjectService.renameProject(projectId, projectName);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  createProject,
  getDetailProject,
  getAllProject,
  getAllTeamProject,
  getPublic,
  updateProject,
  addProject,
  updatePublic,
  updatePrivate,
  deleteProject,
  addEditor,
  getAvatar,
  renameProject,
};
