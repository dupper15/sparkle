const UserRouter = require("./UserRouter");
const MessageRouter = require("./MessageRouter");
const GroupChatRouter = require("./GroupChatRouter");
const routes = (app) => {
  app.use("/api/user", UserRouter),
    app.use("/api/message", MessageRouter),
    app.use("/api/groupChat", GroupChatRouter);
};

module.exports = routes;
