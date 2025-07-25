import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Dashboard } from "./home/Dashboard";
import { CreateHabitButton } from "./home/CreateHabitButton";
import { CreateTaskButton } from "./home/CreateTaskButton";
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
			<CreateHabitButton />
			<CreateTaskButton />
		</div>
	);
}
