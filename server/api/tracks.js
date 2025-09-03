const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Habit = require("../models/habitModel.js");

router.get("/tracks", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const userId = req.session.user.id;
		const habits = await Habit.find({
			userId,
		}).exec();

		res.json({ tracks: habits });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.delete("/track/delete/:id", async (req, res) => {
	try {
		if (!req.session.user) {
			res.status(401).json({ message: "Not Logged In" });
			return;
		}

		const track = await Habit.findById(req.params.id).exec();
		if (track) {
			const result = await track.deleteOne().exec();
			if (result.deletedCount === 1) {
				res.status(201).json({ message: "Track successfully deleted" });
			}
		} else {
			res.status(404).json({ message: "Couldn't find the track" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
