const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/usersModel.js");
const generateInstances = require("../utils/generateInstances.js");

function generateDayString(date) {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = date.getFullYear();

	return `${year}-${month}-${day}`;
}

router.post("/login", async (req, res) => {
	try {
		const { username, passwordHash } = req.body;
		const storedUser = await User.findOne({ username }).exec();

		if (storedUser === null) {
			res.status(401).json({ message: "No such user" });
		}

		if (storedUser.passwordHash == passwordHash) {
			const currentDay = new Date();
			currentDay.setHours(0, 0, 0, 0);
			req.session.user = {
				id: storedUser._id,
				lastAccess: generateDayString(currentDay),
			};

			if (storedUser.lastLogin !== currentDay) {
				storedUser.lastLogin = currentDay;
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
