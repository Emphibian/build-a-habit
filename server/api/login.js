const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/usersModel.js");

router.post("/login", async (req, res) => {
	try {
		const { username, passwordHash } = req.body;
		console.log({ username, passwordHash });
		const storedUser = await User.findOne({ username }).exec();

		if (storedUser === null) {
			res.status(401).json({ message: "No such user" });
		}

		if (storedUser.passwordHash == passwordHash) {
			req.session.user = { id: storedUser._id };
			res.status(201).json({ message: "Logged In" });
		} else {
			res.status(401).json({ message: "Password didn't match" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

module.exports = router;
