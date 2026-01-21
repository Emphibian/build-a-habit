const express = require("express");
const router = express.Router();

const User = require("../models/usersModel.js");
const Task = require("../models/taskModel.js");
const verifyToken = require("../utils/verifyToken.js");

router.post("/createTask", verifyToken, async (req, res) => {
	try {
		const userId = req.id;
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
			timeEstimate: 0,
		});

		await task.save();
		res.status(201).json({ task });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
