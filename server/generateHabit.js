const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URL;
async function mongooseConnect() {
	await mongoose.connect(mongoDB);
}

mongooseConnect().catch((err) => console.log(err));

async function populate() {
	const Instance = require("./models/habitInstanceModel.js");
	const habit = new Instance({
		name: "temp",
		date: "2025-06-19",
		status: "Done",
	});

	await habit.save();
	mongoose.connection.close();
}

populate();
