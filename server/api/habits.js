const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Instance = require("../models/habitInstanceModel.js");

router.get("/habitsInstances", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const userId = req.session.user.id;
		const habitInstances = await Instance.find({ userId }).exec();

		console.log(habitInstances);
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

		if (parseInt(habitInstance.goalTarget) > parseInt(req.body.value)) {
			habitInstance.status = "Not Completed";
		} else {
			habitInstance.status = "Completed";
		}

		habitInstance.goalValue = req.body.value;
		await habitInstance.save();
		res.json(habitInstance);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
