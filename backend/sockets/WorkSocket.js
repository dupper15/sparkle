const WorkSocket = (socket, io) => {
  socket.on("componentColorChanged", ({ componentId, color, roomId }) => {
    socket.to(roomId).emit("componentColorChanged", { componentId, color });
  });
};
module.exports = WorkSocket;
