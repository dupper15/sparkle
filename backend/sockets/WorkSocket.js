const HistoryController = require("../controllers/HistoryController");
const User = require("../models/UserModel");
const Component = require("../models/ComponentModel");
const Project = require("../models/ProjectModel");
const getNameOfUser = async (userId) => {
  const user = await User.findById(userId);
  const userName = user.userName;
  return userName;
};
const getComponentType = async (componentId) => {
  const component = await Component.findById(componentId);
  if (!component) throw new Error("Component not found");

  const componentType = component.type.trim().toLowerCase();
  return componentType;
};
const getTextContent = async (componentId) => {
  const component = await Component.findById(componentId);
  const componentContent = component.content;
  return componentContent;
};
const getShapeType = async (componentId) => {
  const component = await Component.findById(componentId);
  const shapeType = component.shapeType;
  return shapeType;
};
const getIndexOfCanvas = async (canvasId, projectId) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");
  const canvasIndex =
    project.canvasArray.findIndex((canvas) => canvas.toString() === canvasId) +
    1;
  if (canvasIndex === 0) throw new Error("Canvas not found");
  return canvasIndex;
};
const WorkSocket = (socket, io) => {
  socket.on("componentColorChanged", async ({ componentId, color, roomId }) => {
    console.log("test", roomId);
    if (!roomId || !componentId || !color) return;

    socket.to(roomId).emit("componentColorChanged", { componentId, color });
    try {
      const componentType = await getComponentType(componentId);
      if (componentType === "text") {
        const componentContent = await getTextContent(componentId);
        await HistoryController.createHistory({
          projectId: roomId,
          userId: socket.userId,
          content: `Changed color of a text with content: "${componentContent}" to ${color}`,
        });
      } else if (componentType === "shape") {
        const shapeType = await getShapeType(componentId);

        await HistoryController.createHistory({
          projectId: roomId,
          userId: socket.userId,
          content: `Changed color of a ${shapeType} to ${color}`,
        });
      }
    } catch (error) {
      console.error("Error saving history:", error);
    }
  });
  socket.on(
    "textFontFamilyChanged",
    async ({ componentId, fontFamily, roomId }) => {
      console.log("test", roomId);

      if (!roomId || !componentId || !fontFamily) return;
      socket
        .to(roomId)
        .emit("textFontFamilyChanged", { componentId, fontFamily });
      try {
        const componentContent = await getTextContent(componentId);

        await HistoryController.createHistory({
          projectId: roomId,
          userId: socket.userId,
          content: `Changed font family of a text with content: "${componentContent}" to ${fontFamily}`,
        });
      } catch (error) {
        console.error("Error saving history:", error);
      }
    }
  );
  socket.on(
    "textFontSizeChanged",
    async ({ componentId, fontSize, roomId }) => {
      console.log("test", roomId);

      if (!roomId || !componentId || !fontSize) return;
      socket.to(roomId).emit("textFontSizeChanged", { componentId, fontSize });
      try {
        const componentContent = await getTextContent(componentId);

        await HistoryController.createHistory({
          projectId: roomId,
          userId: socket.userId,
          content: `Changed font size of a text with content: "${componentContent}" to ${fontSize}`,
        });
      } catch (error) {
        console.error("Error saving history:", error);
      }
    }
  );
  socket.on(
    "textFontWeightChanged",
    async ({ componentId, fontWeight, roomId }) => {
      console.log("test", roomId);

      if (!roomId || !componentId || !fontWeight) return;
      socket
        .to(roomId)
        .emit("textFontWeightChanged", { componentId, fontWeight });
      try {
        const componentContent = await getTextContent(componentId);

        await HistoryController.createHistory({
          projectId: roomId,
          userId: socket.userId,
          content: `Changed font weight of a text with content: "${componentContent}" to ${fontWeight}`,
        });
      } catch (error) {
        console.error("Error saving history:", error);
      }
    }
  );
  socket.on(
    "textFontStyleChanged",
    async ({ componentId, fontStyle, roomId }) => {
      console.log("test", roomId);

      if (!roomId || !componentId || !fontStyle) return;
      socket
        .to(roomId)
        .emit("textFontStyleChanged", { componentId, fontStyle });
      try {
        const componentContent = await getTextContent(componentId);

        await HistoryController.createHistory({
          projectId: roomId,
          userId: socket.userId,
          content: `Changed font style of a text with content: "${componentContent}" to ${fontStyle}`,
        });
      } catch (error) {
        console.error("Error saving history:", error);
      }
    }
  );
  socket.on(
    "textDecorationLineChanged",
    async ({ componentId, textDecorationLine, roomId }) => {
      console.log("test", roomId);

      if (!roomId || !componentId || !textDecorationLine) return;
      socket
        .to(roomId)
        .emit("textDecorationLineChanged", { componentId, textDecorationLine });
      try {
        const componentContent = await getTextContent(componentId);

        await HistoryController.createHistory({
          projectId: roomId,
          userId: socket.userId,
          content: `Changed text decoration line of a text with content: "${componentContent}" to ${textDecorationLine}`,
        });
      } catch (error) {
        console.error("Error saving history:", error);
      }
    }
  );
  socket.on("textAlignChanged", async ({ componentId, textAlign, roomId }) => {
    console.log("test", roomId);

    if (!roomId || !componentId || !textAlign) return;
    socket.to(roomId).emit("textAlignChanged", { componentId, textAlign });
    try {
      const componentContent = await getTextContent(componentId);

      await HistoryController.createHistory({
        projectId: roomId,
        userId: socket.userId,
        content: `Changed text align of a text with content: "${componentContent}" to ${textAlign}`,
      });
    } catch (error) {
      console.error("Error saving history:", error);
    }
  });
  socket.on("textContentChanged", async ({ componentId, content, roomId }) => {
    if (!roomId || !componentId || !content) return;
    socket.to(roomId).emit("textContentChanged", { componentId, content });
    // try {
    //   const userName = await getNameOfUser(socket.userId);
    //   const componentType = await getComponentType(componentId);
    //   await HistoryController.createHistory({
    //     projectId: roomId,
    //     userId: socket.userId,
    //     content: `${getNameOfUser(
    //       socket.userId
    //     )} changed content of a text to ${content}`,
    //   });
    // } catch (error) {
    //   console.error("Error saving history:", error);
    // }
  });
  socket.on("remove-component", async ({ componentId, roomId }) => {
    console.log("test", roomId);

    console.log("remove-component");
    if (!roomId || !componentId) return;
    socket.to(roomId).emit("remove-component", { componentId });
    try {
      const componentType = await getComponentType(componentId);
      if (componentType === "text") {
        const componentContent = await getTextContent(componentId);
        await HistoryController.createHistory({
          projectId: roomId,
          userId: socket.userId,
          content: `Removed a text with content: "${componentContent}"`,
        });
      } else if (componentType === "shape") {
        const shapeType = await getShapeType(componentId);

        await HistoryController.createHistory({
          projectId: roomId,
          userId: socket.userId,
          content: `Removed a ${shapeType}`,
        });
      } else {
        await HistoryController.createHistory({
          projectId: roomId,
          userId: socket.userId,
          content: `Removed an ${componentType}`,
        });
      }
    } catch (error) {
      console.error("Error saving history:", error);
    }
  });
  socket.on(
    "componentZIndexChanged",
    async ({ componentId, zIndex, roomId }) => {
      console.log("test", roomId);

      if (!roomId || !componentId) return;
      socket.to(roomId).emit("componentZIndexChanged", { componentId, zIndex });
      try {
        const componentType = await getComponentType(componentId);
        let lastZIndex;
        if (zIndex === 0) {
          lastZIndex = "back";
        } else if (zIndex === 50) {
          lastZIndex = "front";
        } else {
          lastZIndex = zIndex;
        }
        if (componentType === "text") {
          const componentContent = await getTextContent(componentId);
          await HistoryController.createHistory({
            projectId: roomId,
            userId: socket.userId,
            content: `Changed z-index of a text with content: "${componentContent}" to ${lastZIndex}`,
          });
        } else if (componentType === "shape") {
          const shapeType = await getShapeType(componentId);

          await HistoryController.createHistory({
            projectId: roomId,
            userId: socket.userId,
            content: `Changed z-index of a ${shapeType} to ${lastZIndex}`,
          });
        } else {
          await HistoryController.createHistory({
            projectId: roomId,
            userId: socket.userId,
            content: `Changed z-index of an ${componentType} to ${lastZIndex}`,
          });
        }
      } catch (error) {
        console.error("Error saving history:", error);
      }
    }
  );
  socket.on("addCanvas", async ({ roomId, newCanvas }) => {
    console.log("test", roomId);

    if (!roomId || !newCanvas) return;
    socket.to(roomId).emit("addCanvas", { newCanvas });
    try {
      await HistoryController.createHistory({
        projectId: roomId,
        userId: socket.userId,
        content: `Added a new canvas to the project`,
      });
    } catch (error) {
      console.error("Error saving history:", error);
    }
  });
  socket.on("removeCanvas", async ({ roomId, canvasId }) => {
    console.log("test", roomId);

    console.log("removeCanvas");
    if (!roomId || !canvasId) return;
    socket.to(roomId).emit("removeCanvas", { canvasId });
    try {
      await HistoryController.createHistory({
        projectId: roomId,
        userId: socket.userId,
        content: `Removed a canvas from the project`,
      });
    } catch (error) {
      console.error("Error saving history:", error);
    }
  });
  socket.on("updateBackground", async ({ roomId, canvasId, background }) => {
    console.log("test", roomId);

    if (!roomId || !canvasId || !background) return;
    socket.to(roomId).emit("updateBackground", { canvasId, background });
    try {
      const canvasIndex = await getIndexOfCanvas(canvasId, roomId);
      await HistoryController.createHistory({
        projectId: roomId,
        userId: socket.userId,
        content: `Changed the background of canvas number ${canvasIndex}`,
      });
    } catch (error) {
      console.error("Error saving history:", error);
    }
  });
  socket.on("componentAdded", async ({ roomId, canvasId, component }) => {
    console.log("test", roomId);

    if (!roomId || !canvasId || !component) {
      console.error("Missing parameters:", { roomId, canvasId, component });
      return;
    }
    socket.to(roomId).emit("componentAdded", { canvasId, component });

    try {
      let componentType =
        component.type?.toString().trim().toLowerCase() || "unknown";
      if (componentType === "shape" && component.shapeType) {
        componentType = component.shapeType.trim().toLowerCase();
      }

      const history = await HistoryController.createHistory({
        projectId: roomId,
        userId: socket.userId,
        content: `Added a ${componentType} to the project`,
      });

      console.log("History saved:", history);
    } catch (error) {
      console.error("Error saving history:", error);
    }
  });

  socket.on("updateShape", async (data) => {
    if (!data) return;
    const { roomId, shapeId, x, y, width, height, rotate } = data;
    console.log("test", roomId);

    socket.to(roomId).emit("shapeUpdated", {
      shapeId,
      x,
      y,
      width,
      height,
      rotate,
    });
  });
  socket.on(
    "componentOpacityChanged",
    async ({ roomId, componentId, opacity }) => {
      console.log("test", roomId);

      socket.to(roomId).emit("componentOpacityChanged", {
        componentId,
        opacity,
      });
    }
  );
  socket.on(
    "componentHorizontalFlipChanged",
    async ({ roomId, componentId, horizontalFlip, componentType }) => {
      console.log("test", roomId);

      socket.to(roomId).emit("componentHorizontalFlipChanged", {
        componentType,
        componentId,
        horizontalFlip,
      });
      try {
        const userName = await getNameOfUser(socket.userId);
        const componentType = await getComponentType(componentId);
        if (horizontalFlip === false) {
          await HistoryController.createHistory({
            projectId: roomId,
            userId: socket.userId,
            content: `Horizontal flipped a ${componentType}`,
          });
        } else {
          await HistoryController.createHistory({
            projectId: roomId,
            userId: socket.userId,
            content: `Horizontal unflipped a ${componentType}`,
          });
        }
      } catch (error) {
        console.error("Error saving history:", error);
      }
    }
  );
  socket.on(
    "componentVerticalFlipChanged",
    async ({ roomId, componentId, verticalFlip }) => {
      console.log("test", roomId);

      socket
        .to(roomId)
        .emit("componentVerticalFlipChanged", { componentId, verticalFlip });
      try {
        const componentType = await getComponentType(componentId);
        if (verticalFlip === false) {
          await HistoryController.createHistory({
            projectId: roomId,
            userId: socket.userId,
            content: `Vertical flipped a ${componentType}`,
          });
        } else {
          await HistoryController.createHistory({
            projectId: roomId,
            userId: socket.userId,
            content: `Vertical unflipped a ${componentType}`,
          });
        }
      } catch (error) {
        console.error("Error saving history:", error);
      }
    }
  );
  socket.on("changedCanvas", (data) => {
    if (!data) return;
    const { roomId } = data;
    socket.to(roomId).emit("changedCanvas", roomId);
  });
  socket.on("updateText", async (data) => {
    if (!data) return;
    const { roomId, textId, x, y, width, height, rotate } = data;
    console.log("test", roomId);

    socket.to(roomId).emit("updateText", {
      textId,
      x,
      y,
      width,
      height,
      rotate, // Đảm bảo luôn gửi `rotate`
    });
    // try {
    //   const userName = await getNameOfUser(socket.userId);
    //   await HistoryController.createHistory({
    //     projectId: roomId,
    //     userId: socket.userId,
    //     content: `${userName} changed a text`,
    //   });
    // } catch (error) {
    //   console.error("Error saving history:", error);
    // }
  });
};
module.exports = WorkSocket;
