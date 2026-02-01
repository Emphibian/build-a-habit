import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Dashboard } from "../components/home/Dashboard.jsx";
import userAPI from "../api/userAPI";

export function Landing() {
	const navigate = useNavigate();

	useEffect(() => {
		try {
			const redirectIfLoggedIn = async () => {
				const response = await userAPI.getUser();
				if (response.status == 200) {
					navigate("/home", { replace: true });
				}
			};

			redirectIfLoggedIn();
		} catch (_) {
			console.error("Error checking login status");
		}
	});

	return (
		<>
			<Dashboard />
			<h1>buildAhabit App</h1>
			<p>
				Proceed to <Link to="/register">Register</Link>
			</p>
			<p>
				Proceed to <Link to="/login">Login</Link>
			</p>
		</>
	);
}
