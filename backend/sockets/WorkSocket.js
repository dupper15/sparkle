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
};
module.exports = WorkSocket;
