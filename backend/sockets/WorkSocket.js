const WorkSocket = (socket, io) => {
  socket.on("componentColorChanged", ({ componentId, color, roomId }) => {
    if (!roomId || !componentId || !color) return;
    socket.to(roomId).emit("componentColorChanged", { componentId, color });
  });
  socket.on("textFontFamilyChanged", ({ componentId, fontFamily, roomId }) => {
    if (!roomId || !componentId || !fontFamily) return;
    socket
      .to(roomId)
      .emit("textFontFamilyChanged", { componentId, fontFamily });
  });
  socket.on("textFontSizeChanged", ({ componentId, fontSize, roomId }) => {
    if (!roomId || !componentId || !fontSize) return;
    socket.to(roomId).emit("textFontSizeChanged", { componentId, fontSize });
  });
  socket.on("textFontWeightChanged", ({ componentId, fontWeight, roomId }) => {
    if (!roomId || !componentId || !fontWeight) return;
    socket
      .to(roomId)
      .emit("textFontWeightChanged", { componentId, fontWeight });
  });
  socket.on("textFontStyleChanged", ({ componentId, fontStyle, roomId }) => {
    if (!roomId || !componentId || !fontStyle) return;
    socket.to(roomId).emit("textFontStyleChanged", { componentId, fontStyle });
  });
  socket.on(
    "textDecorationLineChanged",
    ({ componentId, textDecorationLine, roomId }) => {
      if (!roomId || !componentId || !textDecorationLine) return;
      socket
        .to(roomId)
        .emit("textDecorationLineChanged", { componentId, textDecorationLine });
    }
  );
  socket.on("textAlignChanged", ({ componentId, textAlign, roomId }) => {
    if (!roomId || !componentId || !textAlign) return;
    socket.to(roomId).emit("textAlignChanged", { componentId, textAlign });
  });
  socket.on("textContentChanged", ({ componentId, content, roomId }) => {
    if (!roomId || !componentId || !content) return;
    socket.to(roomId).emit("textContentChanged", { componentId, content });
  });
  socket.on("remove-component", ({ componentId, roomId }) => {
    if (!roomId || !componentId) return;
    socket.to(roomId).emit("remove-component", { componentId });
  });
  socket.on("componentZIndexChanged", ({ componentId, zIndex, roomId }) => {
    if (!roomId || !componentId || !zIndex) return;
    socket.to(roomId).emit("componentZIndexChanged", { componentId, zIndex });
  });
  socket.on("addCanvas", ({ roomId, newCanvas }) => {
    if (!roomId || !newCanvas) return;
    socket.to(roomId).emit("addCanvas", { newCanvas });
  });
  socket.on("removeCanvas", ({ roomId, canvasId }) => {
    if (!roomId || !canvasId) return;
    socket.to(roomId).emit("removeCanvas", { canvasId });
  });
  socket.on("updateBackground", ({ roomId, canvasId, background }) => {
    if (!roomId || !canvasId || !background) return;
    socket.to(roomId).emit("updateBackground", { canvasId, background });
  });
  socket.on("componentAdded", ({ roomId, canvasId, component }) => {
    if (!roomId || !canvasId || !component) return;
    socket.to(roomId).emit("componentAdded", { canvasId, component });
  });
  socket.on("updateShape", (data) => {
    if (!data) return;
    const { roomId, shapeId, x, y, width, height, rotate } = data;
    socket.to(roomId).emit("shapeUpdated", {
      shapeId,
      x,
      y,
      width,
      height,
      rotate,
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
    const { roomId, textId, x, y, width, height, rotate } = data;
    if (!rotate) {
      socket.to(roomId).emit("updateText", {
        textId,
        x,
        y,
        width,
        height,
        rotate,
      });
    }
    if (rotate) {
      socket.to(roomId).emit("updateText", {
        textId,
        x,
        y,
        width,
        height,
        rotate,
      });
    }
  });
};
module.exports = WorkSocket;
