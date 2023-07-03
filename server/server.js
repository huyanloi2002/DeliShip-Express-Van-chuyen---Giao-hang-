require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dataBase = require("./config/dataBase");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const SocketServer = require("./socketServer");

const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/deliship-express/v1", require("./routes/authRouter"));
app.use("/api/deliship-express/v1", require("./routes/orderRouter"));
app.use("/api/deliship-express/v1", require("./routes/userRouter"));
app.use("/api/deliship-express/v1", require("./routes/paymentRouter"));
app.use("/api/deliship-express/v1", require("./routes/notifyRouter"));
app.use("/api/deliship-express/v1", require("./routes/contactRouter"));

dataBase();

const port = process.env.PORT || 8000;
http.listen(port, () => {
  console.log("server listening on port", port);
});
