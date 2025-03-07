// Import required modules for testing
import request from "supertest";
import app from "./app.js";

// Define test suite for POST /weather route
describe("POST /weather" , () => {
  it("should return weather data for a valid city", async () => {
    const response = await request(app)
     .post('/weather')
     .send({ cityName: "London" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("temperature");
    expect(response.body.temperature).toBeGreaterThan(-50);
    expect(response.body.temperature).toBeLessThan(60);
  });

  it("should return an error for an invalid city", async () => {
    const response = await request(app)
     .post('/weather')
     .send({ cityName: "InvalidCity" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("weatherText", "City is not found");
  });

  it("should return an error for an empty city", async () => {
    const response = await request(app)
     .post('/weather')
     .send({ cityName: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("weatherText", "City name is required");
  });
}); 

