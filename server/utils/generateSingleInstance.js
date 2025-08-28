const Instance = require("../models/habitInstanceModel.js");

// function to generate instance
async function generateSingleInstance(habit, userId) {
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
		workDuration: 0,
	});

	await instance.save();
	return instance;
}

module.exports = generateSingleInstance;
