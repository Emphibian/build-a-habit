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

router.patch("/task/updateEstimate/:id", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const userId = req.session.user.id;
		const taskId = req.params.id;

		const task = await Task.findById(taskId).exec();
		const value = parseInt(req.body.value);

		task.timeEstimate = value;
		await task.save();
		res.status(201).json(task);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.delete("/task/delete/:id", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const userId = req.session.user.id;
		const task = await Task.findById(req.params.id).exec();
		if (task) {
			const result = await task.deleteOne().exec();
			if (result.deletedCount === 1) {
				res.status(201).json({ message: "Task successfully deleted" });
			}
		} else {
			res.status(404).json({ message: "Couldn't find the task" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
