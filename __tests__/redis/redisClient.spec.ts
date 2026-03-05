import { createClient } from "redis";
import { RedisClient } from "../../src/redis";

jest.mock("redis");

describe("RedisClient", () => {
  let mockClient: any;
  let redisClient: RedisClient;

  beforeEach(() => {
    mockClient = {
      connect: jest.fn(),
      get: jest.fn(),
      set: jest.fn(),
    };

    (createClient as jest.Mock).mockReturnValue(mockClient);

    redisClient = new RedisClient();
  });

  test("connect() should call client.connect()", async () => {
    mockClient.connect.mockResolvedValue(true);

    await redisClient.connect();

    expect(mockClient.connect).toHaveBeenCalledTimes(1);
  });

  test("connect() should throw if Redis connection fails", async () => {
    mockClient.connect.mockRejectedValue(new Error("Connection failed"));

    await expect(redisClient.connect()).rejects.toThrow("Connection failed");
  });

  test("get() should return value from Redis", async () => {
    mockClient.get.mockResolvedValue("123");

    const result = await redisClient.get("weather-key");

    expect(mockClient.get).toHaveBeenCalledWith("weather-key");
    expect(result).toBe("123");
  });

  test("get() should throw if Redis get fails", async () => {
    mockClient.get.mockRejectedValue(new Error("Get failed"));

    await expect(redisClient.get("weather-key")).rejects.toThrow("Get failed");
  });

  test("set() should call Redis set without expiration", async () => {
    mockClient.set.mockResolvedValue(true);

    await redisClient.set("weather-key", "value");

    expect(mockClient.set).toHaveBeenCalledWith("weather-key", "value");
  });

  test("set() should call Redis set with expiration", async () => {
    mockClient.set.mockResolvedValue(true);

    await redisClient.set("weather-key", "value", 3600);

    expect(mockClient.set).toHaveBeenCalledWith("weather-key", "value", {
      expiration: { type: "EX", value: 3600 },
    });
  });

  test("set() should throw if Redis set fails", async () => {
    mockClient.set.mockRejectedValue(new Error("Set failed"));

    await expect(redisClient.set("weather-key", "value")).rejects.toThrow(
      "Set failed"
    );
  });
});
