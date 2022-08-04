import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { mongoose } from "mongoose";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes/auth.route.js";

const app = express();
const port = 3000;

var whitelist = ["http://localhost:3000", "http://localhost:3001"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

app.use(helmet()); // helmet is a security package that helps you secure your Express apps by setting various HTTP headers.
app.use(cors(corsOptions)); // cors is a middleware that allows cross-origin requests.
app.use(express.json()); //parse JSON bodies
app.use(cookieParser());

app.use("/api", routes);

mongoose
  .connect(
    "mongodb+srv://mongouser:6twwLeQJbYItSUwS@cluster0.sl1fg.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!" + err);
  });

app.get("/api/ping", (req, res) => {
  console.log("Cookies: ", req.cookies);
  res.json("pong");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
