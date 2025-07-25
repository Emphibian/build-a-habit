const express = require("express");
const router = express.Router();

const User = require("../models/usersModel.js");
const Task = require("../models/taskModel.js");

router.post("/createTask", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const userId = req.session.user.id;
		const storedUser = await User.findById(userId).exec();
		if (!storedUser) {
			res.status(401).json({ message: "Error in Session" });
			return;
		}

		const { taskName, scheduledOnString } = req.body;
		const scheduledOnDate = new Date(scheduledOnString);
		scheduledOnDate.setHours(0, 0, 0, 0);

		const task = new Task({
			userId,
			name: taskName,
			workDuration: 0,
			completed: false,
			completedOn: null,
			scheduledOn: scheduledOnDate,
		});

		await task.save();
		res.status(201).json({ message: "Task successfully added" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
