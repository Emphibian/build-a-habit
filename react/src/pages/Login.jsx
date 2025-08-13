import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Dashboard } from "../components/home/Dashboard.jsx";
import userAPI from "../api/userAPI.js";

export function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [responseMessage, setResponseMessage] = useState("");
	const navigate = useNavigate();

	const handleLogin = async function (event) {
		event.preventDefault();
		const response = await userAPI.logIn(username, password);
		const data = await response.json();
		setResponseMessage(data.message);
		if (response.ok) {
			navigate("/home", { replace: true });
		}
	};

	return (
		<>
			<Dashboard />
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<label>
					Username:
					<input
						type="text"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
						placeholder="Username"
						required
					/>
				</label>
				<label>
					Password:
					<input
						type="text"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						placeholder="Password"
						required
					/>
				</label>
				<button type="submit">Login</button>
			</form>
			{responseMessage && <p>Logged in successfully</p>}
			{responseMessage && (
				<p>
					Proceed to <Link to="/home">Home</Link>
				</p>
			)}
		</>
	);
}
