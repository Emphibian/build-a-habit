const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 5000;
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
if (!process.env.MONGODB_URL) {
	throw new Error("No database url under the environment variable MONGODB_URL");
}

const mongoDB = process.env.MONGODB_URL;
async function mongooseConnect() {
	await mongoose.connect(mongoDB);
}

mongooseConnect().catch((err) => console.log(err));

if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: true }));
}

app.use(express.static(path.join(__dirname, "/dist")));
app.use(express.json());

app.get("/api/test", async (req, res) => {
	const userModel = require("./models/usersModel");
	const user = await userModel.findOne().exec();
	if (user) res.json(user);
	else console.log("not found");
});

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const registerRouter = require("./api/register.js");
const loginRouter = require("./api/login.js");
app.use("/api", registerRouter);
app.use("/api", loginRouter);

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
