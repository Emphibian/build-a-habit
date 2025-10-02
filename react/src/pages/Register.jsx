import { useState } from "react";
import { Dashboard } from "../components/home/Dashboard.jsx";
import userAPI from "../api/userAPI.js";

export function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [reenterPassword, setReenterPassword] = useState("");
	const [responseMessage, setResponseMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const handleRegister = async function(event) {
		event.preventDefault();
		// check if password is the same as re-enter password
		if (password !== reenterPassword) {
			setErrorMessage("Passwords do not match");
			return;
		}

		setErrorMessage(null);
		const response = await userAPI.register(username, password);
		const data = await response.json();

		// account successfully created
		if (response.status === 201) {
			setResponseMessage(data.message);
		} else {
			setErrorMessage(data.message);
		}
	};

	return (
		<>
			<Dashboard />
			<div className="login">
				<div className="placeholder"></div>
				<div className="placeholder-form">
					<div className="form-div">
						<h2 className="mb-05">Register</h2>
						{errorMessage !== null && (
							<div className="error">{errorMessage}</div>
						)}
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
									type="password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
									required
								/>
								<span>Password</span>
							</label>
							<label>
								<input
									type="password"
									value={reenterPassword}
									onChange={(event) => setReenterPassword(event.target.value)}
									required
								/>
								<span>Re-enter Password</span>
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
