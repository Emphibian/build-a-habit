import { createContext, useState, useEffect } from "react";
import habitAPI from "../api/habitAPI.js";

export const HabitsContext = createContext();

export function HabitsProvider({ children }) {
	const [habits, setHabits] = useState([]);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		async function loadHabitsAndTasks() {
			const habits = await habitAPI.getHabits();
			const tasks = await habitAPI.getTasks();

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

	const createTask = async function (taskObj) {
		const task = await habitAPI.createTask(taskObj.taskName, taskObj.date);
		setTasks((tasks) => [task, ...tasks]);
	};

	return (
		<HabitsContext
			value={{ habits, setHabits, tasks, setTasks, createHabit, createTask }}
		>
			{children}
		</HabitsContext>
	);
}
