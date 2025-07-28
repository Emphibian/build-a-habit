import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Dashboard } from "./home/Dashboard";
import { CreateButton } from "./home/CreateButton.jsx";
import { Habits } from "./home/HabitsContainer";

export function Home() {
	const navigate = useNavigate();
	useEffect(() => {
		try {
			const redirectIfNotLoggedIn = async function () {
				const requestURL = import.meta.env.VITE_SERVER + "/api/user";
				const response = await fetch(requestURL, {
					credentials: "include",
				});

				const data = await response.json();
				if (data.message === "Not Logged In")
					navigate("/login", { replace: true });
			};

			redirectIfNotLoggedIn();
		} catch (error) {
			console.error("Error checking login status");
		}
	}, [navigate]);

	return (
		<div className="home">
			<Dashboard />
			<Habits />
			<CreateButton />
		</div>
	);
}
