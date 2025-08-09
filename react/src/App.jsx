import { BrowserRouter, Routes, Route } from "react-router";
import { Landing } from "./pages/Landing";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";

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
