import dotenv from "dotenv";
dotenv.config();
import app from "./app";

import client from "./redis";
const port = process.env.PORT || 3000;

client
  .connect()
  .then(() => {
    console.log("Redis client connected successfully");

    app.listen(port, () => {
      console.log(`Server running at http://127.0.0.1:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to Redis:", err);
    process.exit(1);
  });
