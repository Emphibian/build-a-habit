const Habit = require("../models/habitModel.js");
const Instance = require("../models/habitInstanceModel.js");
const generateSingleInstance = require("./generateSingleInstance.js");

// check if the instance should be generated for the current day
function checkIfInstanceRequired(habit) {
	if (habit.frequency === "daily") {
		return true;
	} else if (habit.frequency === "weekly") {
		const currentDay = new Date().getDay();
		const daysInWeek = habit.frequencyInfo.split(",");
		if (daysInWeek.includes(currentDay.toString())) return true;
	}

	return false;
}

// check if instance has already been generated
async function checkIfInstanceExists(habit) {
	const currentDay = new Date();
	currentDay.setHours(0, 0, 0, 0);

	const instance = await Instance.find({
		habitId: habit._id,
		date: currentDay,
	}).exec();

	return instance.length !== 0;
}

async function generateInstances(userId) {
	const habits = await Habit.find({ userId }).exec();
	const promises = habits
		.filter((habit) => checkIfInstanceRequired(habit))
		.map(async (habit) => {
			const exists = await checkIfInstanceExists(habit);
			return { habit, exists };
		});

	const results = await Promise.all(promises);
	results
		.filter((result) => !result.exists)
		.map((result) => result.habit)
		.forEach(async (habit) => await generateSingleInstance(habit, userId));
}

module.exports = generateInstances;
