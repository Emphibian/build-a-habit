import { useState } from "react";

export function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [responseMessage, setResponseMessage] = useState("");

	const handleLogin = async function (event) {
		event.preventDefault();
		const requestURL = import.meta.env.VITE_SERVER + "/api/login";
		const response = await fetch(requestURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, passwordHash: password }),
			credentials: "include",
		});

		const data = await response.json();
		setResponseMessage(data.message);
	};

	return (
		<>
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
				{responseMessage && <p>{responseMessage}</p>}
			</form>
		</>
	);
}
