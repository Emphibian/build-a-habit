import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import userAPI from "../../api/userAPI.js";

export function Dashboard() {
	const [user, setUser] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async function () {
			const response = await userAPI.getUser();
			if (response.ok) {
				const data = await response.json();
				const userData = data.user;
				setUser(userData);
			} else {
				setUser(null);
			}
		};

		fetchUser();
	}, []);

	const logout = async function () {
		const response = await userAPI.logOut();
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
