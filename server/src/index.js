import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

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

if (process.env.NODE_ENV === "production") {
  originWhitelist.push(process.env.CORS_ORIGIN);
}

const app = Express();
const server = http.createServer(app);
const port = process.env.NODE_PORT || 3000;
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else if (originWhitelist.indexOf(origin) !== -1) {
        // TODO: Remove this log
        console.log(`Origin check from: ${origin}`);
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
    if (process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else if (originWhitelist.indexOf(origin) !== -1) {
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

app.get("/api/ping", (_, res) => {
  console.log("Ping received!");
  res.json("pong");
});

io.of("/socket").on("connection", (socket) => {
  console.log("New client connected");
  // let cook1 = socket.handshake.headers.cookie;

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
