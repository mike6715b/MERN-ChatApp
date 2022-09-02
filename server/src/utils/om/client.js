import { Client } from "redis-om";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL;

/* create and open the Redis OM Client */
const client = await new Client()
  .open(url)
  .then(console.log("Connected to Redis!"));

export default client;
