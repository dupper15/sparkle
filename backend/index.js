const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { MongoClient } = require("mongodb");
const { createAdapter } = require("@socket.io/mongo-adapter");
const { sendMessage, getMessage } = require("./services/MessageService");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
const DB_NAME = "sparkle_db";
const COLLECTION_NAME = "socket.io-adapter-events";
const mongoUri = process.env.MONGO_URI;

const mongoClient = new MongoClient(mongoUri, {});

(async () => {
  try {
    await mongoClient.connect();
    const mongoCollection = mongoClient.db(DB_NAME).collection(COLLECTION_NAME);
    io.adapter(createAdapter(mongoCollection));

    console.log("MongoDB Adapter is set up for Socket.IO!");
  } catch (error) {
    console.error("Error setting up MongoDB Adapter:", error);
  }
})();
const rooms = {};
io.on("connection", (socket) => {
  socket.on("setUserId", (userId) => {
    socket.userId = userId;
  });

  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    if (!rooms[roomId].includes(socket.userId)) {
      rooms[roomId].push(socket.userId);
    }

    io.to(roomId).emit("userInRoom", rooms[roomId]);
    console.log("userInRoom", rooms[roomId]);

    try {
      const response = await getMessage(roomId);
      socket.emit("loadMessages", response.data);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  });
  socket.on("botReply", async (data) => {
    const { botAnswer, roomId } = data;
    try {
      const response = await sendMessage({
        content: botAnswer,
        sender: "SparkleBot",
        groupId: roomId,
      });
      io.to(roomId).emit("chatMessage", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
  socket.on("chatMessage", async (data) => {
    const { userId, roomId, text, imageUrl } = data;

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

  socket.on("disconnect", () => {
    for (const roomId of Object.keys(rooms)) {
      const index = rooms[roomId].indexOf(socket.userId);
      if (index !== -1) {
        rooms[roomId].splice(index, 1);
        io.to(roomId).emit("userInRoom", rooms[roomId]);
        console.log(`User ${socket.userId} removed from room ${roomId}`);
      }
    }
    console.log("A user disconnected:", socket.userId);
  });
});

routes(app);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connect DB success!!");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
