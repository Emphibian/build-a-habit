const express = require("express");
const router = express.Router();

const User = require("../models/usersModel.js");
const Habit = require("../models/habitModel.js");

router.post("/createHabit", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const userId = req.session.user.id;
		const storedUser = await User.findById(userId).exec();
		if (!storedUser) {
			res.status(401).json({ message: "Error in Session" });
			return;
		}

		const { habitName, habitFreq } = req.body;
		const createdAt = new Date();
		const habit = new Habit({
			userId,
			name: habitName,
			frequency: habitFreq,
			createdAt,
		});

		await habit.save();
		res.status(201).json({ message: "Habit successfully added" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
