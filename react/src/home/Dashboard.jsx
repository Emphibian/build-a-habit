import { useState, useEffect } from "react";
import { Link } from "react-router";

export function Dashboard() {
	const [user, setUser] = useState("");
	useEffect(() => {
		async function getUser() {
			const requestURL = import.meta.env.VITE_SERVER + "/api/user";
			const response = await fetch(requestURL, { credentials: "include" });
			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
			} else {
				setUser(null);
			}
		}

		getUser();
	}, []);

	if (user) {
		return (
			<div className="dashboard">
				<div className="header-name">
					<Link to="/home">buildAhabit</Link>
				</div>
				<nav>
					<Link to="/home">Home</Link>
					{user}
					<p>Logout</p>
				</nav>
			</div>
		);
	}

	return (
		<div className="dashboard sign-in">
			<div className="header-name">
				<Link to="/">buildAhabit</Link>
			</div>
			<nav>
				<Link to="/register">Register</Link>
				<Link to="/login">Login</Link>
			</nav>
		</div>
	);
}
