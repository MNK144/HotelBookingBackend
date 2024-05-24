import Redis from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "./config";

const DEFAULT_EXPIRY = 3600;
type TableNames = "hotel" | "room";

class RedisClient {
  public static instance: RedisClient;
  public static getInstance() {
    if(!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  private redis: Redis;
  constructor() {
    this.redis = new Redis({
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
    })
    this.redis.on("error", (err) => console.log("Redis Client Error", err));
  }

  public async set(tableName: TableNames, id: string, value: object) {
    return await this.redis.set(`${tableName}:${id}`, JSON.stringify(value), 'EX', DEFAULT_EXPIRY);
  }

  public async get(tableName: TableNames, id: string) {
    return JSON.parse(await this.redis.get(`${tableName}:${id}`));
  }

  public async del(tableName: TableNames, id: string) {
    return this.redis.del(`${tableName}:${id}`);
  }
}

const redisClient = RedisClient.getInstance();

export default redisClient;