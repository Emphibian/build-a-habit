const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	userId: Number,
	username: String,
	passwordHash: String,
	lastLogin: Date,
});

module.exports = mongoose.model("User", UserSchema);
