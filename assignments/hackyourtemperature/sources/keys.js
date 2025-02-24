import dotenv from "dotenv";
dotenv.config();

export default { BASE_URL: "https://api.openweathermap.org/data/2.5", // Base URL for openWeatherMap API
API_KEY: process.env.API_KEY,
};
