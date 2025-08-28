const express = require("express");
const router = express.Router();

const User = require("../models/usersModel.js");
const Habit = require("../models/habitModel.js");
const generateSingleInstance = require("../utils/generateSingleInstance.js");

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

		const { habitName, habitFreq, habitFreqInfo, goalType, target } = req.body;
		const createdAt = new Date();
		const habit = new Habit({
			userId,
			name: habitName,
			frequency: habitFreq,
			frequencyInfo: habitFreqInfo,
			goalType,
			goalTarget: target,
			createdAt,
		});

		await habit.save();

		const instance = await generateSingleInstance(habit, userId);
		res.status(201).json({ instance });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
