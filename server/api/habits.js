const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const generateInstances = require("../utils/generateInstances.js");
const Instance = require("../models/habitInstanceModel.js");

router.get("/habitsInstances", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const userId = req.session.user.id;
		const lastAccess = new Date(req.session.user.lastAccess);
		const currentDay = new Date();
		currentDay.setHours(0, 0, 0, 0);

		if (lastAccess.getTime() !== currentDay.getTime()) {
			generateInstances(userId);
		}

		const habitInstances = await Instance.find({
			userId,
			date: currentDay,
		}).exec();

		res.json({ habits: habitInstances });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.patch("/habit/completed/:id", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const userId = req.session.user.id;
		const habitInstance = await Instance.findById(req.params.id).exec();

		console.log({ target: habitInstance.goalTarget, value: req.body.value });
		if (habitInstance.goalType === "yes/no") {
			habitInstance.status =
				habitInstance.status === "Completed" ? "Not Completed" : "Completed";
			habitInstance.goalValue = "";
		} else if (parseInt(habitInstance.goalTarget) > parseInt(req.body.value)) {
			habitInstance.status = "Not Completed";
			habitInstance.goalValue = req.body.value;
		} else {
			habitInstance.status = "Completed";
			habitInstance.goalValue = req.body.value;
		}

		await habitInstance.save();
		res.json(habitInstance);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
