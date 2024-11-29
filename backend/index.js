// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const routes = require("./routes");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const { sendMessage, getMessage } = require("./services/MessageService");

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5001;

// const server = createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });
// app.use(
//   cors({
//     origin: "http://localhost:5000",
//     credentials: true,
//   })
// );
// app.use(bodyParser.json());
// app.use(cookieParser());
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("joinRoom", async (roomId) => {
//     socket.join(roomId);
//     console.log(`User joined room: ${roomId}`);

//     try {
//       const response = await getMessage(roomId);
//       socket.emit("loadMessages", response.data);
//     } catch (error) {
//       console.error("Error loading messages:", error);
//     }
//   });

//   socket.on("chatMessage", async (data) => {
//     const { userId, roomId, text } = data;
//     console.log("Received chatMessage:", data);

//     try {
//       const response = await sendMessage({
//         content: text,
//         sender: userId,
//         groupId: roomId,
//       });

//       io.to(roomId).emit("chatMessage", response.data);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
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
// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
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

// Kết nối tới MongoDB và thiết lập adapter
const DB_NAME = "sparkle_db";
const COLLECTION_NAME = "socket.io-adapter-events";
const mongoUri = `mongodb+srv://caoduonglam61:${process.env.MONGO_DB}@sparkle.yhp0w.mongodb.net/?retryWrites=true&w=majority&appName=Sparkle`;

const mongoClient = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    await mongoClient.connect();
    const mongoCollection = mongoClient.db(DB_NAME).collection(COLLECTION_NAME);

    // Thiết lập adapter với MongoDB
    io.adapter(createAdapter(mongoCollection));

    console.log("MongoDB Adapter is set up for Socket.IO!");
  } catch (error) {
    console.error("Error setting up MongoDB Adapter:", error);
  }
})();

// Socket.IO
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

      // Sử dụng `io.to(roomId)` để phát tin nhắn đến tất cả các client trong phòng
      io.to(roomId).emit("chatMessage", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Routes và kết nối cơ sở dữ liệu
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
