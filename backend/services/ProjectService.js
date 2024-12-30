const Canvas = require("../models/CanvasModel");
const Project = require("../models/ProjectModel");
const User = require("../models/UserModel");
const Component = require("../models/ComponentModel");

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

const createCopy = async (userId, data) => {
  try {
    // Lấy dự án gốc
    const checkProject = await Project.findById(data.data).populate({
      path: "canvasArray",
      populate: {
        path: "componentArray",
        model: "Component",
      },
    });

    if (!checkProject) {
      return {
        status: "ERROR",
        message: "Original project not found.",
      };
    }
    // Tạo bản sao dữ liệu của dự án
    const projectObject = JSON.parse(JSON.stringify(checkProject.toObject()));
    delete projectObject._id;

    const newProjectData = {
      ...projectObject,
      owner: userId,
      editorArray: [],
      isPublic: false,
      copy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Sao chép canvasArray và componentArray
    newProjectData.canvasArray = await Promise.all(
      (newProjectData.canvasArray || []).map(async (canvas) => {
        const newCanvas = { ...canvas };
        delete newCanvas._id;

        newCanvas.componentArray = await Promise.all(
          (canvas.componentArray || []).map(async (component) => {
            const newComponent = { ...component };
            delete newComponent._id;

            //newComponent.type = component.type

            // Lưu component mới
            const savedComponent = await Component.create(newComponent);
            return savedComponent;
          })
        );

        // Lưu canvas mới
        const savedCanvas = await Canvas.create(newCanvas);
        return savedCanvas;
      })
    );

    // Lưu dự án mới
    const createdProject = await Project.create(newProjectData);
   
    return {
      status: "OK",
      message: "Create success",
      data: createdProject,
    };
  } catch (error) {
    console.error("Error creating project copy:", error.message);
    return {
      status: "ERROR",
      message: "Failed to create Project",
      error: error.message,
    };
  }
};

const getDetailProject = (projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const project = await Project.findOne({
        _id: projectId,
      }).populate({
        path: "canvasArray",
        populate: {
          path: "componentArray",
          model: "Component",
        },
      });
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
        copy: null,
      }).populate({
        path: "canvasArray",
        populate: {
          path: "componentArray",
          model: "Component",
        },
      });
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
      const user = await User.findById(userId);
      const projects = await Project.find({
        editorArray: { $in: [user.email] },
      }).populate({
        path: "canvasArray",
        populate: {
          path: "componentArray",
          model: "Component",
        },
      });
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
        copy: { $ne: null },
      }).populate({
        path: "canvasArray",
        populate: {
          path: "componentArray",
          model: "Component",
        },
      });
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

const updateProject = (projectId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("data", data);
      const checkProject = await Project.findOne({
        _id: projectId,
      }).populate({
        path: "canvasArray",
        populate: {
          path: "componentArray",
          model: "Component",
        },
      });
      if (!checkProject) {
        resolve({
          status: "ERROR",
          message: "Project is not defined!",
        });
        return;
      }

      const updatedCanvasCopy = JSON.parse(JSON.stringify(data));
      delete updatedCanvasCopy._id;

      updatedCanvasCopy.componentArray = await Promise.all(
        (updatedCanvasCopy.componentArray || []).map(async (component) => {
          const newComponent = { ...component };
          delete newComponent._id;

          const savedComponent = await Component.create(newComponent);
          return savedComponent;
        })
      );

      const savedCanvasCopy = await Canvas.create(updatedCanvasCopy);

      let createdCanvas = null;

      if (data && Object.keys(data).length > 0) {
        createdCanvas = savedCanvasCopy;
      } else {
        createdCanvas = await Canvas.create({
          background: "#ffffff",
          componentArray: [],
        });
      }

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

const addProject = (projectId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("data", data.canvasArray);
      const checkProject = await Project.findOne({
        _id: projectId,
      }).populate({
        path: "canvasArray",
        populate: {
          path: "componentArray",
          model: "Component",
        },
      });
      if (!checkProject) {
        resolve({
          status: "ERROR",
          message: "Project is not defined!",
        });
        return;
      }

      const newCanvases = await Promise.all(
        (data.canvasArray || []).map(async (canvas) => {
          const updatedCanvasCopy = JSON.parse(JSON.stringify(canvas));
          delete updatedCanvasCopy._id;

          updatedCanvasCopy.componentArray = await Promise.all(
            (updatedCanvasCopy.componentArray || []).map(async (component) => {
              const newComponent = { ...component };
              delete newComponent._id;

              const savedComponent = await Component.create(newComponent);
              return savedComponent;
            })
          );

          return await Canvas.create(updatedCanvasCopy);
        })
      );

      const canvasArray = [
        ...(checkProject.canvasArray || []).map((canvas) => canvas._id),
        ...newCanvases.map((canvas) => canvas._id),
      ];

      console.log("canvasArray", canvasArray);

      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { canvasArray },
        { new: true }
      ).populate({
        path: "canvasArray",
        populate: {
          path: "componentArray",
          model: "Component",
        },
      });

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

const updatePublic = async (projectId) => {
  try {
    const checkProject = await Project.findOne({ _id: projectId }).populate({
      path: "canvasArray",
      populate: {
        path: "componentArray",
        model: "Component",
      },
    });

    checkProject.isPublic = true;
    checkProject.save();

    if (!checkProject) {
      return {
        status: "ERROR",
        message: "Project is not defined!",
      };
    }

    const updatedProjectCopy = JSON.parse(JSON.stringify(checkProject));

    updatedProjectCopy.copy = projectId;
    delete updatedProjectCopy._id;
    updatedProjectCopy.isPublic = true;

    updatedProjectCopy.canvasArray = await Promise.all(
      (updatedProjectCopy.canvasArray || []).map(async (canvas) => {
        const newCanvas = { ...canvas };
        delete newCanvas._id;

        newCanvas.componentArray = await Promise.all(
          (canvas.componentArray || []).map(async (component) => {
            const newComponent = { ...component };
            delete newComponent._id;

            const savedComponent = await Component.create(newComponent);
            return savedComponent;
          })
        );

        const savedCanvas = await Canvas.create(newCanvas);
        return savedCanvas;
      })
    );

    const savedProject = await Project.create(updatedProjectCopy);

    const populatedProject = await Project.findById(savedProject._id).populate({
      path: "canvasArray",
      populate: {
        path: "componentArray",
        model: "Component",
      },
    });

    return {
      status: "OK",
      message: "SUCCESS",
      data: populatedProject,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Failed to update Project",
      error: error.message,
    };
  }
};

const updatePrivate = async (projectId) => {
  try {
    const checkProject = await Project.findOne({ _id: projectId }).populate({
      path: "canvasArray",
      populate: {
        path: "componentArray",
        model: "Component",
      },
    });

    checkProject.isPublic = false;
    checkProject.save();

    await Project.findOneAndDelete({ copy: projectId });

    return {
      status: "OK",
      message: "Private project success",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Failed to update Project",
      error: error.message,
    };
  }
};

const deleteProject = (projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const project = await Project.findOne({
        _id: projectId,
      });
      const projectCopy = await Project.findOne({
        copy: projectId,
      });
      console.log(project);
      if (!project) {
        resolve({
          status: "ERROR",
          message: "Project is not defined!",
        });
        return;
      }
      await Project.findByIdAndDelete(projectId);
      await Project.findByIdAndDelete(projectCopy._id);

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

const renameProject = async (projectId, projectName) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return {
        status: "ERROR",
        message: "Project not found!",
      };
    }

    project.projectName = projectName.projectName;

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

const getEditor = (projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const project = await Project.findById(projectId)
      if (!project) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }

      const editors = await User.find({
        email: { $in: project.editorArray }, // Tìm tất cả các user có id trong editorArray
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: editors,
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

const removeEditor = (projectId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const project = await Project.findById(projectId)
      if (!project) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }
      project.editorArray.pull(data.email);
      await project.save();

      resolve({
        status: "OK",
        message: "Editor removed successfully!",
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
  renameProject,
  getEditor,
  removeEditor,
  createCopy
};
