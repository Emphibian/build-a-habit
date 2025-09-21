const Habit = require("../models/habitModel.js");
const Instance = require("../models/habitInstanceModel.js");
const checkIfInstanceRequired = require("./checkIfInstanceRequired.js");
const generateSingleInstance = require("./generateSingleInstance.js");

// check if instance has already been generated
async function checkIfInstanceExists(habit) {
	const currentDay = new Date();
	currentDay.setHours(0, 0, 0, 0);

	const instance = await Instance.find({
		habitId: habit._id,
		date: currentDay,
	}).exec();

	if (instance.length === 0) {
		console.log(`${currentDay} doesn't have ${habit.name}`);
	}

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
