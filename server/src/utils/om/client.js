import { Client } from "redis-om";

/* pulls the Redis URL from .env */
const url =
  "redis://default:KUtuLfratlBPc0LQgAgrJVsEUeI9HNKF@redis-10948.c300.eu-central-1-1.ec2.cloud.redislabs.com:10948";

/* create and open the Redis OM Client */
const client = await new Client().open(url);

export default client;
