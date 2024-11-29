const Canvas = require("../models/CanvasModel");
const Project = require("../models/ProjectModel");
const User = require("../models/UserModel");

const createProject = (newProject) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdCanvas = await Canvas.create({
        background: "#ffffff",
        componentArray: [],
      });
      const createdProject = await Project.create({
        canvasArray: [createdCanvas],
        projectName: newProject.projectName,
        owner: newProject.owner,
        editorArray: [],
        height: newProject.height,
        width: newProject.width,
      });
      if (createdProject) {
        resolve({
          status: "OK",
          message: "Create success",
          data: createdProject,
        });
      } else {
        throw new Error("Project creation failed.");
      }
    } catch (error) {
      console.error("Error creating project:", error.message);
      reject({
        status: "ERROR",
        message: "Failed to create Project",
        error: error.message,
      });
    }
  });
};

const getDetailProject = (projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const project = await Project.findOne({
        _id: projectId,
      }).populate("canvasArray");
      if (!project) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: project,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Project",
        error: error.message,
      });
    }
  });
};

const getAllProject = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const projects = await Project.find({
        owner: userId,
      }).populate("canvasArray");
      if (!projects) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: projects,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Project",
        error: error.message,
      });
    }
  });
};

const getAllTeamProject = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(userId)
      const projects = await Project.find({
        editorArray: { $in: [user.email] }, 
      }).populate("canvasArray");
      if (!projects) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: projects,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Project",
        error: error.message,
      });
    }
  });
};

const getPublic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const projects = await Project.find({
        isPublic: true,
      }).populate("canvasArray");
      if (!projects) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: projects,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Project",
        error: error.message,
      });
    }
  });
};

const updateProject = (projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkProject = await Project.findOne({
        _id: projectId,
      });
      if (!checkProject) {
        resolve({
          status: "ERROR",
          message: "Project is not defined!",
        });
        return;
      }

      const createdCanvas = await Canvas.create({
        background: "#ffffff",
        componentArray: [],
      });

      const canvasArray = [...checkProject.canvasArray, createdCanvas._id];

      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { canvasArray },
        { new: true }
      );

      if (!updatedProject) {
        resolve({
          status: "ERROR",
          message: "Project update failed or not found",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedProject,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to update Project",
        error: error.message,
      });
    }
  });
};

const deleteProject = (projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const project = await Project.findOne({
        _id: projectId,
      });
      if (!project) {
        resolve({
          status: "ERROR",
          message: "Project is not defined!",
        });
        return;
      }
      await Project.findByIdAndDelete(projectId);

      resolve({
        status: "OK",
        message: "Delete success",
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Project",
        error: error.message,
      });
    }
  });
};
const addEditor = async (projectId, email) => {
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return {
        status: "ERROR",
        message: "Project not found!",
      };
    }

    if (project.editors.includes(email)) {
      return {
        status: "ERROR",
        message: "Editor is already added!",
      };
    }

    project.editors.push(email);

    const updatedProject = await project.save();

    return {
      status: "OK",
      message: "SUCCESS",
      data: updatedProject,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Failed to update Project",
      error: error.stack,
    };
  }
};

module.exports = {
  createProject,
  getDetailProject,
  getAllProject,
  getAllTeamProject,
  getPublic,
  updateProject,
  deleteProject,
  addEditor,
};
