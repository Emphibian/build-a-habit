const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 5000;

if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: true }));
}

app.use(express.static(path.join(__dirname, "/dist")));

app.get("/api/test", (req, res) => {
	res.json({ message: "Request received" });
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
