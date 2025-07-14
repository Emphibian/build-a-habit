const express = require("express");
const router = express.Router();

const Habit = require("../models/habitModel.js");
const Instance = require("../models/habitInstanceModel.js");

function checkIfInstanceRequired(habit) {
	if (habit.frequency === "daily") return true;
	if (habit.frequency === "weekly") {
		const currentDay = new Date().getDay();
		const daysInWeek = habit.frequencyInfo.split(",");
		if (daysInWeek.includes(currentDay.toString())) return true;
	}

	return false;
}

async function checkIfInstanceExists(habit) {
	const currentDay = new Date();
	currentDay.setHours(0, 0, 0, 0);

	const instance = await Instance.find({
		habitId: habit._id,
		date: currentDay,
	}).exec();

	if (instance.length === 0) return false;
	return true;
}

async function generateInstance(habit, userId) {
	const currentDay = new Date();
	currentDay.setHours(0, 0, 0, 0);

	const instance = new Instance({
		habitId: habit._id,
		userId,
		name: habit.name,
		date: currentDay,
		status: "Not Completed",
		goalType: habit.goalType,
		goalTarget: habit.goalTarget,
		goalValue: "",
	});

	await instance.save();
}

router.get("/generateInstances", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(201).json({ message: "Not Logged In" });
			return;
		}

		// find all the habits corresponding to the user
		const habits = await Habit.find({ userId: req.session.user.id }).exec();
		// for each check if an instance should be generated
		let filteredHabits = habits.filter((habit) =>
			checkIfInstanceRequired(habit),
		);

		// if yes check if it is already generated
		filteredHabits = filteredHabits.filter(
			async (habit) => !(await checkIfInstanceExists(habit)),
		);

		const promises = filteredHabits.map(async (habit) => {
			const exists = await checkIfInstanceExists(habit);
			return { habit, exists };
		});

		const results = await Promise.all(promises);
		filteredHabits = results
			.filter((result) => !result.exists)
			.map((result) => result.habit);

		// if not generate it
		filteredHabits.forEach(
			async (habit) => await generateInstance(habit, req.session.user.id),
		);

		res.status(201).json({ message: "Generated Instances" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
