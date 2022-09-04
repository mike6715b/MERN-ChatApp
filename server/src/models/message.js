import schema_pkg from "mongoose";

const { Schema } = schema_pkg;

const messageSchema = new Schema(
  {
    author: { type: String, required: true },
    author_name: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default schema_pkg.model("Message", messageSchema);
