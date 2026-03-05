import request from "supertest";
import app from "../../src/app";
import axios from "axios";

jest.mock("axios");

// Mock de l’instance Redis utilisée par la route météo
jest.mock("../../src/redis", () => ({
  __esModule: true,
  default: {
    connect: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
  },
}));

import redisClient from "../../src/redis";

describe("weatherRoutes", () => {
  test("GET /api/weather returns API data when Redis empty", async () => {
    (redisClient.get as jest.Mock).mockResolvedValue(null);

    (axios.get as jest.Mock).mockResolvedValue({
      data: { temp: 20, city: "Paris" },
    });

    const response = await request(app).get("/api/weather");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ temp: 20, city: "Paris" });
    expect(redisClient.set).toHaveBeenCalled();
  });

  test("GET /api/weather/unknown returns 404", async () => {
    const response = await request(app).get("/api/weather/unknown");
    expect(response.status).toBe(404);
  });
});
