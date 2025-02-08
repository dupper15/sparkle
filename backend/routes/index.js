const UserRouter = require("./UserRouter");
const ComponentRouter = require("./ComponentRouter");
const ImageRouter = require("./ImageRouter");
const ShapeRouter = require("./ShapeRouter");
const TextRouter = require("./TextRouter");
const MessageRouter = require("./MessageRouter");
const ProjectRouter = require("./ProjectRouter");
const CanvasRouter = require("./CanvasRouter");
const BackgroundRouter = require("./BackgroundRouter");
const HistoryRouter = require("./HistoryRouter");
const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/component", ComponentRouter);
  app.use("/api/image", ImageRouter);
  app.use("/api/shape", ShapeRouter);
  app.use("/api/text", TextRouter);
  app.use("/api/message", MessageRouter);
  app.use("/api/project", ProjectRouter);
  app.use("/api/canvas", CanvasRouter);
  app.use("/api/background", BackgroundRouter);
  app.use("/api/history", HistoryRouter);
};

module.exports = routes;
