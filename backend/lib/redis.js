import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();
const client = new Redis(process.env.UPSTASH_REDIS_URL);
await client.set("foo", "bar");
// client here is aremote or a connector or a tool to talk to the redis database
export default client;
