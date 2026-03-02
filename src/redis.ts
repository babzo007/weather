import { createClient } from "redis";

class RedisClient {
  private client: ReturnType<typeof createClient>;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to Redis");
    } catch (err) {
      console.error("Failed to connect to Redis", err);
      throw err;
    }
  }

  async get(key: string) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error(`Failed to get key ${key} from Redis`, err);
      throw err;
    }
  }

  async set(key: string, value: string, expirationInSeconds?: number) {
    try {
      if (expirationInSeconds) {
        await this.client.set(key, value, {
          expiration: { type: "EX", value: expirationInSeconds },
        });
      } else {
        await this.client.set(key, value);
      }
    } catch (err) {
      console.error(`Failed to set key ${key} in Redis`, err);
      throw err;
    }
  }
}

const redisClient = new RedisClient();

export default redisClient;
