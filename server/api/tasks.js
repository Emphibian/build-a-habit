const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../models/taskModel.js");

router.get("/tasks", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const currentDay = new Date();
		currentDay.setHours(0, 0, 0, 0);

		const userId = req.session.user.id;
		const tasks = await Task.find({ userId, completed: false }).exec();
		tasks.filter((task) => task.scheduledOn.getTime() <= currentDay.getTime());

		const taskCompletedToday = await Task.find({
			userId,
			completedOn: currentDay,
		});
		taskCompletedToday.forEach((task) => tasks.push(task));
		res.status(201).json({ tasks });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.patch("/task/completed/:id", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged in" });
			return;
		}

		const userId = req.session.user.id;
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
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.patch("/task/addDuration/:id", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const userId = req.session.user.id;
		const taskId = req.params.id;

		const task = await Task.findById(taskId).exec();
		const value = parseInt(req.body.value);

		task.workDuration = task.workDuration + value;
		await task.save();
		res.status(201).json(task);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
