import express from 'express';
import fetch from 'node-fetch';
import keys from './sources/keys.js';


const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.send("Hello from backend to frontend")
});

// Post route to fetch weather data
app.post('/weather', async (req, res) => {
  const { cityName } = req.body;
 
  if (!cityName) {
    return res.status(400).json({ message: "City name is required" });
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      return res.status(404).json({ message: "City is not found" });
    }
    res.json({
      cityName : data.name,
      temprature : data.main.temp
    });
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
export default app;