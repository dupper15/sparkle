const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createServer } = require("http");
const initializeSocket = require("./sockets/socket");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

const server = createServer(app);

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connect DB success!!");
  })
  .catch((err) => {
    console.log(err);
  });

initializeSocket(server, process.env.MONGO_URI);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
