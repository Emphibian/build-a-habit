const express = require("express");
const router = express.Router();
const verifyToken = require("../utils/verifyToken.js");

const Habit = require("../models/habitModel.js");

router.get("/tracks", verifyToken, async (req, res) => {
	try {
		const userId = req.id;
		const habits = await Habit.find({
			userId,
		}).exec();

		res.json({ tracks: habits });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

router.delete("/track/delete/:id", verifyToken, async (req, res) => {
	try {
		const track = await Habit.findById(req.params.id).exec();
		if (track) {
			const result = await track.deleteOne().exec();
			if (result.deletedCount === 1) {
				res
					.status(201)
					.json({ success: "true", message: "Track successfully deleted" });
			}
		} else {
			res.status(404).json({ message: "Couldn't find the track" });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
