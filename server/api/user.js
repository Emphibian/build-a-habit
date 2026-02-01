const express = require("express");
const User = require("../models/usersModel.js");
const router = express.Router();
const generateDayString = require("../utils/generateDayString.js");
const verifyToken = require("../utils/verifyToken.js");

router.get("/user", verifyToken, async (req, res) => {
	try {
		const userId = req.id;
		const storedUser = await User.findById(userId).exec();

		const lastAccess = new Date(req.session.user.lastAccess);
		lastAccess.setHours(0, 0, 0, 0);
		const currentDay = new Date();
		currentDay.setHours(0, 0, 0, 0);

		// reset today work duration if it's a new day
		if (lastAccess.getTime() !== currentDay.getTime()) {
			req.session.user.lastAccess = generateDayString(currentDay);
			storedUser.todayDuration = 0;
			await storedUser.save();
		}

		res.status(200).json({ user: storedUser.username });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.get("/user/todayDuration", verifyToken, async (req, res) => {
	try {
		const userId = req.id;
		const storedUser = await User.findById(userId).exec();
		const lastAccess = new Date(req.session.user.lastAccess);
		lastAccess.setHours(0, 0, 0, 0);
		const currentDay = new Date();
		currentDay.setHours(0, 0, 0, 0);

		if (
			lastAccess.getTime() !== currentDay.getTime() ||
			storedUser.todayDuration === undefined
		) {
			storedUser.todayDuration = 0;
			await storedUser.save();
		}

		res.status(200).json({ duration: storedUser.todayDuration });
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
