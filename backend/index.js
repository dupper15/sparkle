// const express = require("express");
// const dotenv = require("dotenv");
// const { default: mongoose } = require("mongoose");
// const routes = require("./routes");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const { createServer } = require("node:http");
// const { join } = require("node:path");
// const { Server } = require("socket.io");

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5001;
// const server = createServer(app);
// const io = new Server(server);

// app.use(
//   cors({
//     origin: "http://localhost:5000",
//     credentials: true,
//   })
// );
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.get("/", (req, res) => {
//   res.sendFile(join(__dirname, "index.html"));
// });
// io.on("connection", (socket) => {
//   console.log("a user connected");
// });
// routes(app);

// mongoose
//   .connect(
//     `mongodb+srv://caoduonglam61:${process.env.MONGO_DB}@sparkle.yhp0w.mongodb.net/?retryWrites=true&w=majority&appName=Sparkle`
//   )
//   .then(() => {
//     console.log("Connect DB success!!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.listen(port, () => {
//   console.log("Server is running in port", +port);
// });
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

// Tạo server HTTP kết hợp với Express
const server = createServer(app);

// Tạo instance của Socket.IO gắn vào server HTTP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000", // Frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5000", // Frontend URL
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

// Socket.IO handlers
io.on("connection", (socket) => {
  console.log("A user connected");

  // Khi người dùng tham gia phòng
  socket.on("joinRoom", async (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    // Gửi tin nhắn mặc định khi tham gia
    const response = await getMessage(roomId);
    socket.emit("loadMessages", response.data);
  });

  // Khi nhận được tin nhắn
  socket.on("chatMessage", async (data) => {
    const { userId, roomId, text } = data;
    console.log("Received chatMessage:", data);
    try {
      const message = await sendMessage({
        content: text,
        sender: userId,
        groupId: roomId,
      });
      console.log("Message saved:", message.data);
      io.to(roomId).emit("chatMessage", message.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Định nghĩa các route khác
routes(app);

// Kết nối MongoDB
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

// Lắng nghe server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
