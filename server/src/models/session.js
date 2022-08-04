import { Entity, Schema } from "redis-om";
import client from "../utils/om/client.js";

class Session extends Entity {}

const sessionSchema = new Schema(
  Session,
  {
    sessionID: { type: "string" },
    userID: { type: "string" },
    userName: { type: "string" },
  },
  { dataStructure: "JSON" }
);

/* use the client to create a Repository just for Session */
export const sessionRepository = client.fetchRepository(sessionSchema);

/* create the index for Session */
await sessionRepository.createIndex();
