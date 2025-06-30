const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/usersModel");

router.post("/register", async (req, res) => {
	try {
		const { username, passwordHash } = req.body;
		const user = new User({ username, passwordHash });
		await user.save();
		res.status(201).json({ message: "Added Successfully" });
	} catch (error) {
		res.status(500).json({ message: "Couldn't add the user" });
	}
});

module.exports = router;
