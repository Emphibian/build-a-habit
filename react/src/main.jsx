import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Landing } from "./Landing";
import { Register } from "./Register";
import { Login } from "./Login";
import { Home } from "./Home";
import "./assets/styles/main.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
