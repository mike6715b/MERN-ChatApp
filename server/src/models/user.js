// const mongoose = require("mongoose");
// const uniqueValidator = require("mongoose-unique-validator");

import * as mongoose from "mongoose";
import schema_pkg from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const { Schema } = schema_pkg;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

export default schema_pkg.model("User", userSchema);
