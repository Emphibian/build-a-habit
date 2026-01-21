const express = require("express");
const router = express.Router();

const Task = require("../models/taskModel.js");
const User = require("../models/usersModel.js");
const verifyToken = require("../utils/verifyToken.js");

router.get("/tasks", verifyToken, async (req, res) => {
	try {
		const currentDay = new Date();
		currentDay.setHours(0, 0, 0, 0);

		const userId = req.id;
		let tasks = await Task.find({ userId, completed: false }).exec();
		tasks = tasks.filter((task) => {
			return task.scheduledOn.getTime() <= currentDay.getTime();
		});

		const taskCompletedToday = await Task.find({
			userId,
			completed: true,
			completedOn: currentDay,
		});

		taskCompletedToday.forEach((task) => tasks.push(task));

		res.status(201).json({ tasks });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.patch("/task/completed/:id", verifyToken, async (req, res) => {
	try {
		const taskId = req.params.id;
		const task = await Task.findById(taskId).exec();
		const currentDay = new Date();
		currentDay.setHours(0, 0, 0, 0);

		task.completed = task.completed ? false : true;
		if (task.completed) {
			task.completedOn = currentDay;
		}
		await task.save();
		res.status(201).json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.patch("/task/addDuration/:id", verifyToken, async (req, res) => {
	try {
		const userId = req.id;
		const taskId = req.params.id;

		const task = await Task.findById(taskId).exec();
		const value = parseInt(req.body.value);
		const user = await User.findById(userId);

		task.workDuration = task.workDuration + value;
		await task.save();

		user.todayDuration = user.todayDuration + value;
		await user.save();
		res.status(201).json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.patch("/task/updateName/:id", verifyToken, async (req, res) => {
	try {
		const id = req.params.id;
		const newName = req.body.value;

		const task = await Task.findById(id).exec();
		if (task) {
			task.name = newName;
			await task.save();
			res.status(200).json(task);
		} else {
			res.status(404).json({
				message: "Not task found for the given ID",
			});
		}
	} catch (err) {
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
});

router.patch("/task/updateEstimate/:id", verifyToken, async (req, res) => {
	try {
		const taskId = req.params.id;

		const task = await Task.findById(taskId).exec();
		const value = parseInt(req.body.value);

		task.timeEstimate = value;
		await task.save();
		res.status(200).json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.patch("/task/updateTimeSpent/:id", verifyToken, async (req, res) => {
	try {
		const taskId = req.params.id;
		const task = await Task.findById(taskId).exec();
		const value = parseInt(req.body.value);

		task.workDuration = value;
		await task.save();
		res.status(200).json(task);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.delete("/task/delete/:id", verifyToken, async (req, res) => {
	try {
		const task = await Task.findById(req.params.id).exec();
		if (task) {
			const result = await task.deleteOne().exec();
			if (result.deletedCount === 1) {
				res.status(204).json({ message: "Task successfully deleted" });
			}
		} else {
			res.status(404).json({ message: "Couldn't find the task" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.get("/tasks/upcoming", verifyToken, async (req, res) => {
	try {
		const userId = req.id;
		const upcomingTasks = await Task.find({
			userId,
			scheduledOn: { $gt: new Date() },
		}).exec();

		return res.status(200).json({ tasks: upcomingTasks });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
});

router.patch("/tasks/reschedule/:id", verifyToken, async (req, res) => {
	try {
		const taskId = req.params.id;

		const rescheduleTask = await Task.findById(taskId).exec();
		const newDate = new Date(req.body.date);
		newDate.setHours(0, 0, 0, 0);

		rescheduleTask.scheduledOn = newDate;
		await rescheduleTask.save();

		res.status(201).json({ task: rescheduleTask });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
