import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

export function Dashboard() {
	const [user, setUser] = useState("");
	const navigate = useNavigate();

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

	const logout = async function () {
		const requestURL = import.meta.env.VITE_SERVER + "/api/logout";
		const response = await fetch(requestURL, { credentials: "include" });

		if (!response.ok) {
			const message = await response.text();
			console.log(message);
		} else {
			navigate("/login");
		}
	};

	if (user) {
		return (
			<div className="dashboard">
				<div className="header-name">
					<Link to="/home">buildAhabit</Link>
				</div>
				<nav>
					<Link to="/home">Home</Link>
					{user}
					<button onClick={() => logout()}>Logout</button>
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
