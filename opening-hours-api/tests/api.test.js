// tests/api.test.js

const request = require("supertest");
const app = require("../app");

const mongoose = require("mongoose");

describe("Authentication", () => {
    let token;

    test("Register a new user", async () => {
        const response = await request(app)
            .post("/register")
            .send({ username: "testUser", password: "password123" });
        expect(response.statusCode).toBe(201);
    });

    test("Login with registered user", async () => {
        const response = await request(app)
            .post("/login")
            .send({ username: "testUser", password: "password123" });
        expect(response.statusCode).toBe(200);
        token = response.body.token;
    });
});

describe("Opening Hours API", () => {
    test("Get opening hours for current week without authentication", async () => {
        const response = await request(app).get("/opening-hours/current-week");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe("Creating, Updating and Deleting Opening Hours", () => {
    let token;
    let openingHourId;

    // Before running each test, authenticate a user
    beforeEach(async () => {
        const response = await request(app)
            .post("/login")
            .send({ username: "testUser", password: "password123" });
        token = response.body.token;
    });

    test("Create new opening hours with authentication", async () => {
        const newOpeningHour = {
            dayOfWeek: 1,
            openTime: "09 AM",
            closeTime: "06 PM",
        };
        const response = await request(app)
            .post("/opening-hours")
            .set("Authorization", token)
            .send(newOpeningHour);
        openingHourId = response.body._id;
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("_id");
    });

    test("Update opening hours", async () => {
        const updatedOpeningHour = {
            dayOfWeek: 1,
            openTime: "10:00",
            closeTime: "18:00",
        };
        const response = await request(app)
            .put(`/opening-hours/${openingHourId}`)
            .set("Authorization", token)
            .send(updatedOpeningHour);
        expect(response.statusCode).toBe(200);
        expect(response.body.openTime).toBe(updatedOpeningHour.openTime);
        expect(response.body.closeTime).toBe(updatedOpeningHour.closeTime);
    });

    test("Delete opening hours", async () => {
        const response = await request(app)
            .delete(`/opening-hours/${openingHourId}`)
            .set("Authorization", token);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            "Opening hour deleted successfully."
        );
    });
});

describe("Error Handling", () => {
    test("Invalid route", async () => {
        const response = await request(app).get("/invalid-route");
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Route not found.");
    });

    test("Unauthorized access to authenticated route", async () => {
        const response = await request(app).post("/opening-hours");
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe(
            "Access denied. Please provide a valid token."
        );
    });
});

// Close Mongoose connection after all tests have finished
afterAll(async () => {
    await mongoose.connection.close();
});
