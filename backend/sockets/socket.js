const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/mongo-adapter");
const { MongoClient } = require("mongodb");
const {
  sendMessage,
  getMessage,
  getUserName,
} = require("../services/MessageService");

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
  const selectComponent = {};
  io.on("connection", (socket) => {
    socket.on("setUserId", (userId) => {
      socket.userId = userId;
    });

    socket.on("joinRoom", async (roomId) => {
      if (!roomId) return;

      socket.join(roomId);
      rooms[roomId] = rooms[roomId] || [];

      if (!rooms[roomId].includes(socket.userId)) {
        rooms[roomId].push(socket.userId);
      }

      io.to(roomId).emit("userInRoom", rooms[roomId]);
      console.log("User joined room", { roomId, users: rooms[roomId] });

      try {
        const response = await getMessage(roomId);
        socket.emit("loadMessages", response.data);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    });

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

      activeUsers[databaseId] = activeUsers[databaseId] || {};

      if (x === null || y === null) {
        if (activeUsers[databaseId][socket.userId]) {
          delete activeUsers[databaseId][socket.userId];
          socket
            .to(databaseId)
            .emit("remove-cursor", { userId: socket.userId });
        }
      } else {
        const userName = await getUserName(socket.userId);
        activeUsers[databaseId][socket.userId] = { x, y, userName };
        socket.to(databaseId).emit("update-cursor", {
          userId: socket.userId,
          x,
          y,
          userName,
        });
      }
    });

    socket.on("join-page", (databaseId) => {
      if (!socket.userId || !databaseId) return;

      socket.join(databaseId);
      activeUsers[databaseId] = activeUsers[databaseId] || {};

      Object.entries(activeUsers[databaseId]).forEach(([userId, position]) => {
        socket.emit("update-cursor", { userId, ...position });
      });
    });

    socket.on("leave-page", (databaseId) => {
      if (!socket.userId || !databaseId) return;

      socket.leave(databaseId);

      if (activeUsers[databaseId]?.[socket.userId]) {
        delete activeUsers[databaseId][socket.userId];
        socket.to(databaseId).emit("remove-cursor", { userId: socket.userId });
      }
    });
    socket.on("select-component", async ({ id, userId1, roomId }) => {
      socket.join(roomId);
      const userName = await getUserName(userId1);
      console.log("User selected component:", { id, userId1, userName });
      // Initialize selection array if it doesn't exist
      if (!selectComponent[id]) {
        selectComponent[id] = [];
      }

      // Add user to selection if not already present
      if (!selectComponent[id].find((user) => user.userId === userId1)) {
        selectComponent[id].push({ userId1, userName });
      }
      console.log("Updated selectComponent:", selectComponent);
      io.to(roomId).emit("update-select-component", selectComponent);
    });

    // Handle component deselection
    socket.on("deselect-component", ({ id, userId, roomId }) => {
      if (selectComponent[id]) {
        // Remove user from selection
        selectComponent[id] = selectComponent[id].filter(
          (user) => user.userId !== userId
        );

        // Remove the component if no users are selecting it
        if (selectComponent[id].length === 0) {
          delete selectComponent[id];
        }
      }

      console.log(
        "Updated selectComponent after deselection:",
        selectComponent
      );
      io.to(roomId).emit("update-select-component", selectComponent);
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
