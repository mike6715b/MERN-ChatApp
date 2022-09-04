import schema_pkg from "mongoose";

const { Schema } = schema_pkg;

const conversationSchema = new Schema(
  {
    user1: { type: String, required: true },
    user2: { type: String, required: true },
    lastMessage_author: { type: String, required: true },
    lastMessage_content: { type: String, required: true },
  },
  { timestamps: true }
);

export default schema_pkg.model("Conversation", conversationSchema);
