import ShapeService from "../ShapeService.js";
import TextService from "../TextService.js";
import ImageService from "../ImageService.js";
import ComponentService from "../ComponentService.js";
import socket from "../../utils/socket.js";

export const createAndAddComponentToCanvas = async (
  canvasId,
  componentType,
  componentData
) => {
  console.log(componentData)
  try {
    let componentResponse;

    switch (componentType) {
      case "Shape":
        componentResponse = await ShapeService.createShape(componentData);
        break;
      case "Text":
        componentResponse = await TextService.createText(componentData);
        break;
      case "Image":
        componentResponse = await ImageService.createImage(componentData);
        break;
      default:
        throw new Error("Invalid component type.");
    }

    const componentId = componentResponse.data._id;

    // Add the component to the canvas
    const canvasResponse = await ComponentService.addComponentToCanvas(
      canvasId,
      componentId
    );
    return {
      status: "OK",
      message: `${componentType} created and added to canvas successfully.`,
      data: canvasResponse.data,
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error.message,
    };
  }
};

export const removeAndPopComponentFromCanvas = async (
  canvasId,
  componentType,
  componentId
) => {
  try {
    switch (componentType) {
      case "Shape":
        await ShapeService.deleteShape(componentId);
        break;
      case "Text":
        await TextService.deleteText(componentId);
        break;
      case "Image":
        await ImageService.deleteImage(componentId);
        break;
      default:
        throw new Error("Invalid component type.");
    }
  } catch (error) {
    return {
      status: "ERROR",
      message: error.message,
    };
  }
};

// // Example Usage
// const canvasId = '64fbdf1c77d13a1b6c8278cd';
// const shapeData = {
//     x: 150,
//     y: 150,
//     shapeType: 'Rectangle',
//     height: 100,
//     width: 100,
//     opacity: 0.8,
//     z_index: 1,
//     rotate: 0,
//     color: '#ff0000',
// };
//
// createAndAddComponentToCanvas(canvasId, 'Shape', shapeData)
//     .then(response => console.log(response))
//     .catch(error => console.error(error));
