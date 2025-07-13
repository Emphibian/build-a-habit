import { useState, useEffect } from "react";
import Checkmark from "../assets/svgs/checkmark.svg?react";

function Habit({ name, status, handleComplete }) {
	const fill = "#e6e6e6";
	return (
		<div className="habit">
			<p className="habit-name">{name}</p>
			<p>{status}</p>
			<button onClick={handleComplete}>
				<Checkmark fill={fill} />
			</button>
		</div>
	);
}

export function Habits() {
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
			<div className="todo-habits">
				<h2>To do</h2>
				{habits.map((habit) => {
					if (habit.status === "Not Completed") {
						return (
							<Habit
								key={habit._id}
								name={habit.name}
								handleComplete={() => handleComplete(habit._id)}
							/>
						);
					}
				})}
			</div>
			<div className="done-habits">
				<h2>Completed</h2>
				{habits.map((habit) => {
					if (habit.status === "Completed") {
						return (
							<Habit
								key={habit._id}
								name={habit.name}
								handleComplete={() => handleComplete(habit._id)}
							/>
						);
					}
				})}
			</div>
		</div>
	);
}
