# Weather API

Simple **Weather API** built with **Node.js, Express, TypeScript, and Redis caching**.  
This API fetches weather data from an external weather service and caches it in Redis to improve performance and reduce API calls.

---

## Features

- 🌤 Fetch weather data for **Paris**
- ⚡ Redis caching to reduce external API calls
- 🚦 Rate limiting to prevent abuse
- 🔐 Environment variables with dotenv
- 🧪 Unit testing with Jest
- 🧹 Linting and formatting with ESLint and Prettier

---

## Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **Redis**
- **Axios**
- **Jest**
- **ESLint**
- **Prettier**

---

## Project Structure

```
weather-api
│
├── src
│ ├── routes
│ │ └── weatherRoutes.ts
│ ├── redis.ts
│ ├── app.ts
│ └── server.ts
│
├── tests
├── dist
├── .env
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/babzo007/weather.git
cd weather-api
```

Install dependencies:

```bash
npm install
```

Environment Variables

Create a .env file in the root directory.

Example:

```bash
PORT=3000

API_KEY=your_weather_api_key
BASE_URL=https://api.weatherapi.com/v1/current.json

REDIS_PARIS_KEY=paris

REDIS_HOST=localhost
REDIS_PORT=6379
```

| Script             | Description               |
| ------------------ | ------------------------- |
| `npm run dev`      | Run server with ts-node   |
| `npm run watch`    | Run with nodemon          |
| `npm run build`    | Compile TypeScript        |
| `npm start`        | Run compiled server       |
| `npm run lint`     | Run ESLint                |
| `npm run lint:fix` | Fix lint issues           |
| `npm run format`   | Format code with Prettier |
| `npm test`         | Run lint + tests          |
