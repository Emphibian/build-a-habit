const express = require("express");
const User = require("../models/usersModel.js");
const router = express.Router();

router.get("/user", async (req, res) => {
	try {
		if (req.session.user) {
			const userId = req.session.user.id;
			const storedUser = await User.findById(userId).exec();

			res.json({ user: storedUser.username });
		} else {
			res.status(401).json({ message: "Not Logged In" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.get("/user/todayDuration", async (req, res) => {
	try {
		if (req.session.user) {
			const userId = req.session.user.id;
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
		} else {
			res.status(401).json({ message: "Not Logged In" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
