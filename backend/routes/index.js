const UserRouter = require('./UserRouter')
const ComponentRouter = require('./ComponentRouter')
const ImageRouter = require('./ImageRouter')
const ShapeRouter = require('./ShapeRouter')
const TextRouter = require('./TextRouter')
const MessageRouter = require("./MessageRouter");
const GroupChatRouter = require("./GroupChatRouter");

const routes = (app) => {
    app.use('/api/user', (UserRouter))
    app.use('/api/component', (ComponentRouter))
    app.use('/api/image', (ImageRouter))
    app.use('/api/shape', (ShapeRouter))
    app.use('/api/text', (TextRouter))
    app.use("/api/message", MessageRouter),
    app.use("/api/groupChat", GroupChatRouter);
}

module.exports = routes;
