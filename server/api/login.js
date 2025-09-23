const express = require("express");
const router = express.Router();

const User = require("../models/usersModel.js");
const generateInstances = require("../utils/generateInstances.js");
const generateDayString = require("../utils/generateDayString.js");

router.post("/login", async (req, res) => {
	try {
		const { username, passwordHash } = req.body;
		const storedUser = await User.findOne({ username }).exec();

		if (storedUser === null) {
			res.status(401).json({ message: "No such user" });
		}

		// TODO replace this with actual hashing
		if (storedUser.passwordHash == passwordHash) {
			const currentDay = new Date();
			currentDay.setHours(0, 0, 0, 0);
			req.session.user = {
				id: storedUser._id,
				lastAccess: generateDayString(currentDay),
			};

			// logging in for the first time today
			if (storedUser.lastLogin.getTime() !== currentDay.getTime()) {
				storedUser.lastLogin = currentDay;
				storedUser.todayDuration = 0;
				await storedUser.save();
				generateInstances(storedUser._id);
			}

			res.status(201).json({ message: "Logged In" });
		} else {
			res.status(401).json({ message: "Password didn't match" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
