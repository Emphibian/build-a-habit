const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	name: String,
	workDuration: Number,
	completed: Boolean,
	completedOn: Date,
	scheduledOn: Date,
});

module.exports = mongoose.model("Task", TaskSchema);
