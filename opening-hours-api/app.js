//app.js

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const OpeningHour = require("./models/OpeningHour");
const User = require("./models/User");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// connecting to mongodb database
mongoose
	.connect("mongodb://localhost:27017/opening_hours_db")
	.then(() => {
		console.log(`Connected to mongoDB`);
	})
	.catch((error) => {
		console.log(error);
	});

// Define a secret key for JWT
const secretKey = "Bishwash123";

// Authentication middleware
let blacklist = [];
const authenticateUser = (req, res, next) => {
	const token = req.header("Authorization");
	if (!token)
		return res
			.status(401)
			.json({ message: "Access denied. Please provide a valid token." });

	// Check if token is blacklisted
	if (blacklist.includes(token)) {
		return res.status(401).send({ auth: false, message: "Token revoked." });
	}

	try {
		const decoded = jwt.verify(token, secretKey);
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid token." });
	}
};

// routes

// Register a new user
app.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;

		// Check if the username already exists
		const existingUser = await User.findOne({ username });
		if (existingUser)
			return res
				.status(400)
				.json({ message: "Username already exists." });

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user
		const newUser = await User.create({
			username,
			password: hashedPassword,
		});

		res.status(201).json({
			username: newUser.username,
			message: "User registered successfully.",
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Login route
app.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		// Find user by username
		const user = await User.findOne({ username });
		if (!user)
			return res.status(401).json({ message: "Invalid credentials." });

		// Compare passwords
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(401).json({ message: "Invalid credentials." });

		// Generate JWT token
		const token = jwt.sign(
			{ user: { id: user._id, username: user.username } },
			secretKey
		);
		res.json({ token });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Logout route
app.post("/logout", authenticateUser, (req, res) => {
	const token = req.headers["authorization"];

	// Add token to blacklist
	blacklist.push(token);

	res.status(200).send({ auth: false, message: "Token revoked." });
});

// Create new opening hours and saving them in the mongo database
app.post("/opening-hours", authenticateUser, async (req, res) => {
	try {
		const { dayOfWeek, openTime, closeTime } = req.body;
		if (dayOfWeek < 0 || dayOfWeek > 6) {
			return res.status(400).json({ message: "Invalid Day of week." });
		}
		const openingHour = await OpeningHour.create({
			dayOfWeek,
			openTime,
			closeTime,
		});
		res.status(201).json(openingHour);
	} catch (err) {
		console.error("Error creating opening hour:", err);
		res.status(400).json({ message: err.message });
	}
});

// Update existing opening hours
app.put("/opening-hours/:id", authenticateUser, async (req, res) => {
	try {
		const { id } = req.params;
		const { dayOfWeek, openTime, closeTime } = req.body;
		const openingHour = await OpeningHour.findByIdAndUpdate(
			id,
			{ dayOfWeek, openTime, closeTime },
			{ new: true }
		);
		if (!openingHour) {
			return res.status(404).json({ message: "Opening hour not found." });
		}
		const updatedOpeningHour = await OpeningHour.findById(id);
		res.json(updatedOpeningHour);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete existing opening hours
app.delete("/opening-hours/:id", authenticateUser, async (req, res) => {
	try {
		const { id } = req.params;
		const deletedOpeningHour = await OpeningHour.findByIdAndDelete(id);
		if (!deletedOpeningHour) {
			return res.status(404).json({ message: "Opening hour not found." });
		}
		res.json({ message: "Opening hour deleted successfully." });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get opening hours for current week
app.get("/opening-hours/current-week", async (req, res) => {
	try {
		const openingHours = await OpeningHour.find({});
		res.json(openingHours);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

app.get("/", (req, res) => {
	res.send("Hello from Node api");
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Something went wrong." });
});

// Route not found handler
app.use((req, res, next) => {
	res.status(404).json({ message: "Route not found." });
});

module.exports = app;
