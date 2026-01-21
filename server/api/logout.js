const express = require("express");
const router = express.Router();

// TODO: Delete the jwt token from client side
router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).send("Unable to log out");
		}

		res.clearCookie("connect.sid", { path: "/" });
		res.status(201).send("Logged out");
	});
});

module.exports = router;
