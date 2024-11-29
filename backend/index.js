const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
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
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    try {
      const response = await getMessage(roomId);
      socket.emit("loadMessages", response.data);
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  });

  socket.on("chatMessage", async (data) => {
    const { userId, roomId, text } = data;
    console.log("Received chatMessage:", data);

    try {
      const response = await sendMessage({
        content: text,
        sender: userId,
        groupId: roomId,
      });

      io.to(roomId).emit("chatMessage", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
routes(app);
mongoose
  .connect(
    `mongodb+srv://caoduonglam61:${process.env.MONGO_DB}@sparkle.yhp0w.mongodb.net/?retryWrites=true&w=majority&appName=Sparkle`
  )
  .then(() => {
    console.log("Connect DB success!!");
  })
  .catch((err) => {
    console.log(err);
  });
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
