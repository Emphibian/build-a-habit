import { BrowserRouter, Routes, Route } from "react-router";
import { Landing } from "./Landing";
import { Register } from "./Register";
import { Login } from "./Login";
import { Home } from "./Home";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
}
