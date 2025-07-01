import { Link } from "react-router";

export function Landing() {
	return (
		<>
			<h1>Habit Tracker App</h1>
			<p>
				Proceed to <Link to="/register">Register</Link>
			</p>
			<p>
				Proceed to <Link to="/login">Login</Link>
			</p>
		</>
	);
}
