const WorkSocket = (socket, io) => {
  socket.on("componentColorChanged", ({ componentId, color, roomId }) => {
    socket.to(roomId).emit("componentColorChanged", { componentId, color });
  });
  socket.on("textFontFamilyChanged", ({ componentId, fontFamily, roomId }) => {
    socket
      .to(roomId)
      .emit("textFontFamilyChanged", { componentId, fontFamily });
  });
  socket.on("textFontSizeChanged", ({ componentId, fontSize, roomId }) => {
    socket.to(roomId).emit("textFontSizeChanged", { componentId, fontSize });
  });
  socket.on("textFontWeightChanged", ({ componentId, fontWeight, roomId }) => {
    socket
      .to(roomId)
      .emit("textFontWeightChanged", { componentId, fontWeight });
  });
  socket.on("textFontStyleChanged", ({ componentId, fontStyle, roomId }) => {
    socket.to(roomId).emit("textFontStyleChanged", { componentId, fontStyle });
  });
  socket.on(
    "textDecorationLineChanged",
    ({ componentId, textDecorationLine, roomId }) => {
      socket
        .to(roomId)
        .emit("textDecorationLineChanged", { componentId, textDecorationLine });
    }
  );
  socket.on("textAlignChanged", ({ componentId, textAlign, roomId }) => {
    socket.to(roomId).emit("textAlignChanged", { componentId, textAlign });
  });
  socket.on("textContentChanged", ({ componentId, content, roomId }) => {
    socket.to(roomId).emit("textContentChanged", { componentId, content });
  });
  socket.on("remove-component", ({ componentId, roomId }) => {
    socket.to(roomId).emit("remove-component", { componentId });
  });
  socket.on("componentZIndexChanged", ({ componentId, zIndex, roomId }) => {
    socket.to(roomId).emit("componentZIndexChanged", { componentId, zIndex });
  });
  socket.on("addCanvas", ({ roomId, newCanvas }) => {
    socket.to(roomId).emit("addCanvas", { newCanvas });
  });
  socket.on("removeCanvas", ({ roomId, canvasId }) => {
    socket.to(roomId).emit("removeCanvas", { canvasId });
  });
  socket.on("updateBackground", ({ roomId, canvasId, background }) => {
    socket.to(roomId).emit("updateBackground", { canvasId, background });
  });
  socket.on("componentAdded", ({ roomId, canvasId, component }) => {
    socket.to(roomId).emit("componentAdded", { canvasId, component });
  });
  socket.on("updateShape", (data) => {
    const { roomId, shapeId, x, y, width, height } = data;
    socket.to(roomId).emit("shapeUpdated", {
      shapeId,
      x,
      y,
      width,
      height,
    });
  });
  socket.on("componentOpacityChanged", ({ roomId, componentId, opacity }) => {
    socket.to(roomId).emit("componentOpacityChanged", {
      componentId,
      opacity,
    });
  });
  socket.on(
    "componentHorizontalFlipChanged",
    ({ roomId, componentId, horizontalFlip, componentType }) => {
      socket.to(roomId).emit("componentHorizontalFlipChanged", {
        componentType,
        componentId,
        horizontalFlip,
      });
    }
  );
  socket.on(
    "componentVerticalFlipChanged",
    ({ roomId, componentId, verticalFlip }) => {
      socket
        .to(roomId)
        .emit("componentVerticalFlipChanged", { componentId, verticalFlip });
    }
  );
  socket.on("updateText", (data) => {
    const { roomId, textId, x, y, width, height } = data;
    socket.to(roomId).emit("updateText", {
      textId,
      x,
      y,
      width,
      height,
    });
  });
};
module.exports = WorkSocket;
