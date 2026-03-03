import express from "express";
import redisClient from "../redis";
import axios from "axios";

const router = express.Router();

router.get("/", async (_, res) => {
  const data = await redisClient.get("weather-" + process.env.REDIS_PARIS_KEY);

  if (data) {
    console.log("Data retrieved from Redis cache");
    return res.json(JSON.parse(data));
  } else {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/Paris,FR?key=${process.env.API_KEY}`
      );

      const fetchedData = response.data;
      await redisClient.set(
        "weather-" + process.env.REDIS_PARIS_KEY,
        JSON.stringify(fetchedData),
        3600
      );

      console.log("Data fetched from API and stored in Redis");

      res.json(fetchedData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  }
});

router.use((_, res) => {
  res.status(404).json({ error: "Page not found" });
});

export default router;
