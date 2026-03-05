import { createClient } from "redis";

export class RedisClient {
  private client: ReturnType<typeof createClient>;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });
  }

  async connect() {
    return this.client.connect();
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async set(key: string, value: string, expirationInSeconds?: number) {
    if (expirationInSeconds) {
      return this.client.set(key, value, {
        expiration: { type: "EX", value: expirationInSeconds },
      });
    }
    return this.client.set(key, value);
  }
}

export default new RedisClient();
