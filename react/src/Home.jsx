import { useState, useEffect } from "react";
import { Dashboard } from "./home/Dashboard";
import { CreateHabitButton } from "./home/CreateHabitButton";

function Habits() {
	const [habits, setHabits] = useState([]);
	useEffect(() => {
		async function getHabits() {
			const requestURL = import.meta.env.VITE_SERVER + "/api/habitsInstances";
			const response = await fetch(requestURL, { credentials: "include" });

			if (!response.ok) {
				setHabits(null);
				return;
			}

			const data = await response.json();
			setHabits(data.habits);
		}

		getHabits();
	}, []);

	return <ul>{habits.map((habit) => <li key={habit._id}>{habit.name}</li>)}</ul>;
}

export function Home() {
	return (
		<div className="home">
			<Dashboard />
			<Habits />
			<CreateHabitButton />
		</div>
	);
}
