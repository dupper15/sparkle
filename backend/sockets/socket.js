const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/mongo-adapter");
const { MongoClient } = require("mongodb");
const {
  sendMessage,
  getMessage,
  getUserName,
} = require("../services/MessageService");
const WorkSocket = require("./WorkSocket");
const DB_NAME = "sparkle_db";
const COLLECTION_NAME = "socket.io-adapter-events";

const initializeSocket = async (server, mongoUri) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const mongoClient = new MongoClient(mongoUri);
  try {
    await mongoClient.connect();
    const mongoCollection = mongoClient.db(DB_NAME).collection(COLLECTION_NAME);
    io.adapter(createAdapter(mongoCollection));
    console.log("MongoDB Adapter is set up for Socket.IO!");
  } catch (error) {
    console.error("Error setting up MongoDB Adapter:", error);
    return;
  }

  const rooms = {};
  const activeUsers = {};
  io.on("connection", (socket) => {
    socket.on("setUserId", (userId) => {
      socket.userId = userId;
    });

    socket.on("joinRoom", async (roomId) => {
      if (!roomId) return;

      socket.join(roomId);
      rooms[roomId] = rooms[roomId] || [];
      io.to(roomId).emit("userInRoom", rooms[roomId]);
      if (!rooms[roomId].includes(socket.userId)) {
        rooms[roomId].push(socket.userId);
      }

      console.log("User joined room", { roomId, users: rooms[roomId] });

      try {
        const response = await getMessage(roomId);
        socket.emit("loadMessages", response.data);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    });
    socket.on("leaveRoom", (roomId) => {
      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter((id) => id !== socket.userId);
      }
      io.to(roomId).emit("userInRoom", rooms[roomId]);
    });
    WorkSocket(socket, io);
    socket.on("chatMessage", async (data) => {
      const { userId, roomId, text, imageUrl } = data;
      if (!userId || !roomId || (!text && !imageUrl)) return;

      try {
        const response = await sendMessage({
          content: text,
          sender: userId,
          groupId: roomId,
          imageUrl,
        });
        io.to(roomId).emit("chatMessage", response.data);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("botReply", async ({ botAnswer, roomId }) => {
      if (!botAnswer || !roomId) return;

      try {
        const response = await sendMessage({
          content: botAnswer,
          sender: "SparkleBot",
          groupId: roomId,
        });
        io.to(roomId).emit("chatMessage", response.data);
      } catch (error) {
        console.error("Error sending bot reply:", error);
      }
    });

    socket.on("imageReply", async ({ imageAnswer, roomId }) => {
      if (!imageAnswer || !roomId) return;

      try {
        const response = await sendMessage({
          imageUrl: imageAnswer,
          content: "Đây là hình theo yêu cầu của bạn",
          sender: "SparkleBot",
          groupId: roomId,
        });
        io.to(roomId).emit("chatMessage", response.data);
      } catch (error) {
        console.error("Error sending image reply:", error);
      }
    });

    socket.on("mousemove", async ({ x, y, databaseId }) => {
      if (!socket.userId || !databaseId) return;
      const userName = await getUserName(socket.userId);
      socket.to(databaseId).emit("update-cursor", {
        userId: socket.userId,
        x,
        y,
        userName,
        databaseId,
      });
    });

    socket.on("join-page", (databaseId) => {
      if (!socket.userId || !databaseId) return;
      socket.join(databaseId);
    });

    socket.on("leave-page", (data) => {
      const { databaseId } = data;
      if (!databaseId) return;
      const userId = socket.userId;

      socket.to(databaseId).emit("remove-cursor", userId);
    });

    socket.on("select-component", async ({ id, userId1, roomId }) => {
      socket.join(roomId);
      const userName = await getUserName(userId1);
      socket
        .to(roomId)
        .emit("update-select-component", { id, userId1, userName });
    });
    socket.on("deselect-component", ({ componentId, userId, roomId }) => {
      socket
        .to(roomId)
        .emit("update-deselect-component", { componentId, userId });
    });
    socket.on("disconnect", () => {
      for (const roomId in rooms) {
        const index = rooms[roomId]?.indexOf(socket.userId);
        if (index !== -1) {
          rooms[roomId].splice(index, 1);
          io.to(roomId).emit("userInRoom", rooms[roomId]);
          console.log(`User ${socket.userId} removed from room ${roomId}`);
        }
      }

      for (const canvasId in activeUsers) {
        if (activeUsers[canvasId]?.[socket.userId]) {
          delete activeUsers[canvasId][socket.userId];
          socket.to(canvasId).emit("remove-cursor", { userId: socket.userId });
        }
      }

      console.log("A user disconnected", socket.userId);
    });
  });
};

module.exports = initializeSocket;
