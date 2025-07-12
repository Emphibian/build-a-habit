const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URL;
async function mongooseConnect() {
	await mongoose.connect(mongoDB);
}

mongooseConnect().catch((err) => console.log(err));

async function populate() {
	const Instance = require("./models/habitInstanceModel.js");
	const Habit = require("./models/habitModel.js");

	const habit = new Habit({
		name: "Meditate",
		frequency: "daily",
		createdAt: new Date(),
		frequencyInfo: "",
	});

	const habit2 = new Habit({
		name: "Journal",
		frequency: "weekly",
		createdAt: new Date(),
		frequencyInfo: "5",
	});

	await habit.save();
	await habit2.save();
	mongoose.connection.close();
}

populate();
