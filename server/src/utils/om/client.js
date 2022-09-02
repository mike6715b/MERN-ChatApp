import { Client } from "redis-om";
import dotenv from "dotenv";
dotenv.config();

/* pulls the Redis URL from .env */
console.log({ REDIS_URL: process.env.REDIS_URL });
const url = process.env.REDIS_URL;

/* create and open the Redis OM Client */
const client = await new Client()
  .open(url)
  .then(console.log("Connected to Redis!"));

export default client;
