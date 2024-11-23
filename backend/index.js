const express = require("express")
const dotenv = require("dotenv")
const { default: mongoose } = require("mongoose")
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config()

const app = express()
const port = process.env.PORT || 5001

app.use(
    cors({
        origin: "http://localhost:5000",
        credentials: true,
}))
app.use(bodyParser.json())
app.use(cookieParser())

routes(app);

mongoose.connect(`mongodb+srv://caoduonglam61:${process.env.MONGO_DB}@sparkle.yhp0w.mongodb.net/?retryWrites=true&w=majority&appName=Sparkle`)
    .then(() => {
        console.log('Connect DB success!!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log("Server is running in port", + port)
})