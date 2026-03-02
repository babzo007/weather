import express from "express";
import redisClient from "../redis";
import axios from "axios";

const router = express.Router();

router.get("/", async (_, res) => {
  const data = await redisClient.get("weather-" + process.env.REDIS_PARIS_KEY);

  if (data) {
    return res.json(JSON.parse(data));
  } else {
    const response = await axios.get(
      `${process.env.BASE_URL}/Paris,FR?key=${process.env.API_KEY}`
    );

    const fetchedData = response.data;
    await redisClient.set(
      "weather-" + process.env.REDIS_PARIS_KEY,
      JSON.stringify(fetchedData),
      3600
    );

    res.json(fetchedData);
  }
});

//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=YOUR_API_KEY

router.use((_, res) => {
  res.status(404).json({ error: "Page not found" });
});

export default router;
