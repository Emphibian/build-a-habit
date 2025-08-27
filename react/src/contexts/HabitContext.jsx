import { createContext, useState, useEffect } from "react";
import habitAPI from "../api/habitAPI.js";

export const HabitsContext = createContext();

export function HabitsProvider({ children }) {
	const [habits, setHabits] = useState([]);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		async function loadHabitsAndTasks() {
			const [habits, tasks] = Promise.all([
				habitAPI.getHabits(),
				habitAPI.getTasks(),
			]);

			setHabits(habits);
			setTasks(tasks);
		}

		loadHabitsAndTasks();
	}, []);

	const createHabit = async function (habitObj) {
		const newInstance = await habitAPI.createHabit(
			habitObj.habitName,
			habitObj.habitFreq,
			habitObj.habitFreqInfo,
			habitObj.goalType,
			habitObj.target,
		);

		setHabits((habits) => [newInstance, ...habits]);
	};

	return (
		<HabitsContext value={{ habits, setHabits, tasks, setTasks, createHabit }}>
			{children}
		</HabitsContext>
	);
}
