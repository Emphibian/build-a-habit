const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const InstanceSchema = new Schema({
	habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit" },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	name: String,
	date: Date,
	status: String,
	goalType: String,
	goalTarget: String,
	goalValue: String,
	workDuration: Number,
	timeEstimate: Number,
});

module.exports = mongoose.model("Instance", InstanceSchema);
