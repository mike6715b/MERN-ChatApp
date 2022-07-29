// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// require("dotenv").config();

import express from "express";
import { mongoose } from "mongoose";
import helmet from "helmet";
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(helmet()); // helmet is a security package that helps you secure your Express apps by setting various HTTP headers.
app.use(cors); // cors is a middleware that allows cross-origin requests.
app.use(express.json()); //parse JSON bodies

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!" + err);
  });

app.get("/ping", (_, res) => {
  res.json("pong");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
