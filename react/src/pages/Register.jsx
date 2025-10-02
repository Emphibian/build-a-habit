import { useState } from "react";
import { Dashboard } from "../components/home/Dashboard.jsx";
import userAPI from "../api/userAPI.js";

export function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [responseMessage, setResponseMessage] = useState("");

	const handleRegister = async function(event) {
		event.preventDefault();
		const response = await userAPI.register(username, password);
		const data = await response.json();
		setResponseMessage(data.message);
	};

	return (
		<>
			<Dashboard />
			<div className="login">
				<div className="placeholder"></div>
				<div className="placeholder-form">
					<div className="form-div">
						<h2 className="mb-05">Register</h2>
						<form onSubmit={handleRegister}>
							<label>
								<input
									type="text"
									value={username}
									onChange={(event) => setUsername(event.target.value)}
									required
								/>
								<span>Username</span>
							</label>
							<label>
								<input
									type="text"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									required
								/>
								<span>Password</span>
							</label>
							<button type="submit">Register</button>
						</form>
						{responseMessage && <p>{responseMessage}</p>}
					</div>
				</div>
			</div>
		</>
	);
}
