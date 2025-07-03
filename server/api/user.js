const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/usersModel.js");

router.get("/user", async (req, res) => {
	try {
		if (req.session.user) {
			const userId = req.session.user.id;
			const storedUser = await User.findById(userId).exec();

			res.json({ user: storedUser.username });
		} else {
			res.status(401).json({ message: "Not Logged In" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
