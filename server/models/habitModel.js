const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const HabitSchema = new Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	name: String,
	frequency: String,
	createdAt: Date,
});

module.exports = mongoose.model("Habit", HabitSchema);
