const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

mongoose.set("strictQuery", false);
if (!process.env.MONGODB_URL) {
	throw new Error("No database url under the environment variable MONGODB_URL");
}

const mongoDB = process.env.MONGODB_URL;
async function mongooseConnect() {
	await mongoose.connect(mongoDB);
}

mongooseConnect().catch((err) => console.log(err));

// only use cors in development
if (process.env.NODE_ENV === "development") {
	app.use(cors({ origin: true, credentials: true }));
}

app.use(express.static(path.join(__dirname, "/dist")));
app.use(express.json());
app.use(
	session({
		secret: "Temp Secret",
		saveUninitialized: false,
		cookie: { secure: false, sameSite: "Lax" }, // set this to true if deployed in https
	}),
);

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
const userRouter = require("./api/user.js");
app.use("/api", registerRouter);
app.use("/api", loginRouter);
app.use("/api", userRouter);

app.get("/*splat", (req, res) => {
	res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const port = 5000;
app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
