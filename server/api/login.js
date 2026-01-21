const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/usersModel.js");
const generateInstances = require("../utils/generateInstances.js");
const generateDayString = require("../utils/generateDayString.js");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const storedUser = await User.findOne({ username }).exec();

		if (storedUser === null) {
			res.status(401).json({ message: "Username or Password doesn't match" });
		}

		const match = bcrypt.compare(password, storedUser.passwordHash);

		if (!match) {
			res.status(401).json({ message: "Username or Password doesn't match" });
		}

		const currentDay = new Date();
		currentDay.setHours(0, 0, 0, 0);
		req.session.user = {
			id: storedUser._id,
			lastAccess: generateDayString(currentDay),
		};

		// make a jwt token for this sign up
		const token = jwt.sign(
			{ id: storedUser._id },
			"secret", // WARNING: too simple of a secret
			{ expiresIn: "8h" },
		);

		// WARNING: these settings should be changed at deployment
		res.cookie("token", token, {
			httpOnly: true,
			secure: false,
			sameSite: "Lax",
			maxAge: 60 * 60 * 1000 * 8, // 8 hours
		});

		// logging in for the first time today
		if (storedUser.lastLogin.getTime() !== currentDay.getTime()) {
			storedUser.lastLogin = currentDay;
			storedUser.todayDuration = 0;
			await storedUser.save();
			generateInstances(storedUser._id);
		}

		res.status(201).json({ message: "Logged In", token });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
