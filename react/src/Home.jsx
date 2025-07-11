import { useState, useEffect } from "react";
import { Dashboard } from "./home/Dashboard";
import { CreateHabitButton } from "./home/CreateHabitButton";

function Habit({ name, status, handleComplete }) {
	return (
		<div className="habit">
			<p className="habit-name">{name}</p>
			<p>{status}</p>
			<button onClick={handleComplete}>Done</button>
		</div>
	);
}

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

	const handleComplete = async function (id) {
		const requestURL =
			import.meta.env.VITE_SERVER + "/api/habit/completed/" + id;
		const response = await fetch(requestURL, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});
		const updatedHabit = await response.json();
		setHabits(habits.map((habit) => (id === habit._id ? updatedHabit : habit)));
	};

	return (
		<div className="habits-container">
			{habits.map((habit) => {
				return (
					<Habit
						key={habit._id}
						name={habit.name}
						status={habit.status}
						handleComplete={() => handleComplete(habit._id)}
					/>
				);
			})}
		</div>
	);
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
