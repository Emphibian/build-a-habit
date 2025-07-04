const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const InstanceSchema = new Schema({
	habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit" },
	date: Date,
	status: String,
});

module.exports = mongoose.model("Instance", InstanceSchema);
