import redis from "redis";
const url = "redis://127.0.0.1:6379";
const client = redis.createClient(url);
export default client;