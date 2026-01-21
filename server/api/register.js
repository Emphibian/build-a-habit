const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/usersModel");
const SALT_ROUNDS = 12;

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body;
		const userExists = await User.exists({ username });
		if (userExists) {
			return res.status(409).json({ message: "Username already in use" });
		}

		const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
		const currentDay = new Date();
		currentDay.setHours(0, 0, 0, 0);

		const user = new User({ username, passwordHash, lastLogin: currentDay });
		await user.save();

		res.status(201).json({ message: "Added Successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Couldn't add the user" });
	}
});

module.exports = router;
