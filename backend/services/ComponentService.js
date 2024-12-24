const Component = require("../models/ComponentModel");

const createComponent = (newComponent) => {
  return new Promise(async (resolve, reject) => {
    try {
      const createdComponent = await Component.create({
        left: newComponent.left,
        top: newComponent.top,
        height: newComponent.height,
        width: newComponent.width,
        type: newComponent.type,
        opacity: newComponent.opacity,
        zIndex: newComponent.zIndex,
        rotate: newComponent.rotate,
        image: newComponent.image,
        type_shape: newComponent.type_shape,
        color: newComponent.color,
        content: newComponent.content,
        fontSize: newComponent.fontSize,
        fontFamily: newComponent.fontFamily,
        fontStyle: newComponent.fontStyle,
      });
      if (createdComponent) {
        resolve({
          status: "OK",
          message: "Create success",
          data: createdComponent,
        });
        return;
      }
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Component",
        error: error.message,
      });
    }
  });
};

const getDetailComponent = (componentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const component = await Component.findOne({
        _id: componentId,
      });
      if (!Component) {
        resolve({
          status: "ERROR",
          message: "Account is not defined!",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: component,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Component",
        error: error.message,
      });
    }
  });
};

const getAllComponent = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allComponent = await Component.find();
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: allComponent,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to get all component",
        error: error.message,
      });
    }
  });
};

const updateComponent = (componentId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkComponent = await Component.findOne({
        _id: componentId,
      });
      if (!checkComponent) {
        resolve({
          status: "ERROR",
          message: "Component is not defined!",
        });
        return;
      }
      const updatedComponent = await Component.findByIdAndUpdate(
        componentId,
        data,
        { new: true }
      );

      if (!updatedComponent) {
        resolve({
          status: "ERROR",
          message: "Component update failed or not found",
        });
        return;
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedComponent,
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to update component",
        error: error.message,
      });
    }
  });
};

const deleteComponent = (componentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const component = await Component.findOne({
        _id: componentId,
      });
      if (!component) {
        resolve({
          status: "ERROR",
          message: "Component is not defined!",
        });
        return;
      }
      await Component.findByIdAndDelete(componentId);

      resolve({
        status: "OK",
        message: "Delete success",
      });
    } catch (error) {
      reject({
        status: "ERROR",
        message: "Failed to create Component",
        error: error.message,
      });
    }
  });
};

module.exports = {
  createComponent,
  getAllComponent,
  getDetailComponent,
  updateComponent,
  deleteComponent,
};
