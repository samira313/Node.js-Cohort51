// Import necessary modules
import express from 'express';
import fetch from 'node-fetch';
import keys from './sources/keys.js';

// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a simple GET route
app.get('/', async (req, res) => {
  res.send("Hello from backend to frontend")
});

// Post route to fetch weather data
app.post('/weather', async (req, res) => {
  // Extract city name from request body
  const { cityName } = req.body;  

  // Validate the request
  if (!cityName) {
    return res.status(400).json({ weatherText: "City name is required" }); 
  }
  try {
    // Fetch weather data from OpenWeatherMap API using provided city name and API key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
    );
    const data = await response.json();

  
    if (data.cod !== 200) {
      return res.status(404).json({ weatherText: "City is not found" });
    }

    // return fetched weather data
    res.json({
      temperature: data.main.temp,
     weatherText: `The temperature in ${data.name} is ${data.main.temp}°C`
 
    });
    
  } catch (error) {
    res.status(500).json({ weatherText: "Server error" });
  }
});
export default app;