import { useState } from "react";
import { Dashboard } from "../components/home/Dashboard.jsx";

export function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [responseMessage, setResponseMessage] = useState("");

	const handleRegister = async function (event) {
		event.preventDefault();
		const requestURL = import.meta.env.VITE_SERVER + "/api/register";
		const response = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, passwordHash: password }),
		});

		const data = await response.json();
		setResponseMessage(data.message);
	};

	return (
		<>
			<Dashboard />
			<h1>Register</h1>
			<form onSubmit={handleRegister}>
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
				<button type="submit">Register</button>
			</form>
			{responseMessage && <p>{responseMessage}</p>}
		</>
	);
}
