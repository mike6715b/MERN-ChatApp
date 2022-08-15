import dotenv from "dotenv";
dotenv.config();

import Express from "express";
import { Server } from "socket.io";
import http from "http";
import { mongoose } from "mongoose";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

import MessageListener from "./listeners/Message.listener.js";

const originWhitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost",
];

const app = Express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (originWhitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
    allowedHeaders:
      "Content-Type, Authorization, X-Requested-With, X-CSRF-Token",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

var corsOptions = {
  origin: function (origin, callback) {
    if (originWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With, X-CSRF-Token",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(helmet()); // helmet is a security package that helps you secure your Express apps by setting various HTTP headers.
app.use(cors(corsOptions)); // cors is a middleware that allows cross-origin requests.
app.use(Express.json()); //parse JSON bodies
app.use(cookieParser()); //parse cookies

app.use("/api/auth", authRouter);
app.use("/api/", messageRouter);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB database!");
  })
  .catch((err) => {
    console.log("Connection failed to MongoDB! Err: " + err);
  });

app.get("/api/ping", (req, res) => {
  console.log("Ping received!");
  console.log("Cookies: ", req.cookies);
  res.json("pong");
});

io.on("connection", (socket) => {
  console.log("New client connected");
  // let cook1 = socket.handshake.headers.cookie;

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
