import { useState, useEffect } from "react";

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
	const [user, setUser] = useState("");
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

	return (
		<>
			<h1>Welcome {user}</h1>
		<Habits />
		</>
	);
}
