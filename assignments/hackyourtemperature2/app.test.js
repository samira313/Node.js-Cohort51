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
    expect(response.body).toHaveProperty("cityName");
    expect(response.body).toHaveProperty("temprature");
  });

  it("should return an error for an invalid city", async () => {
    const response = await request(app)
     .post('/weather')
     .send({ cityName: "InvalidCity" });

    expect(response.status).toBe(404);
    expect(response.body.message).toContain("City");
  });

  it("should return an error for an empty city", async () => {
    const response = await request(app)
     .post('/weather')
     .send({ cityName: "" });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "City name is required");
  });
}); 

