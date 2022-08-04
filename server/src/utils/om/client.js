import { Client } from "redis-om";
import dotenv from "dotenv";
dotenv.config();

/* pulls the Redis URL from .env */
const url = process.env.REDIS_URL;

/* create and open the Redis OM Client */
const client = await new Client().open(url);

export default client;
