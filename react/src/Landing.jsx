import { Link } from "react-router";
import { Dashboard } from "./home/Dashboard.jsx";

export function Landing() {
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
