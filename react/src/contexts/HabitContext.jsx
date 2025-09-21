import { createContext, useState, useEffect, useCallback } from "react";
import habitAPI from "../api/habitAPI.js";

export const HabitsContext = createContext();

export function HabitsProvider({ children }) {
	const [habits, setHabits] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [estimate, setEstimate] = useState(0);

	useEffect(() => {
		async function loadHabitsAndTasks() {
			const habits = await habitAPI.getHabits();
			const tasks = await habitAPI.getTasks();

			setHabits(habits);
			setTasks(tasks);
			setEstimate(calculateEstimate(habits, tasks));
		}

		function calculateEstimate(habits, tasks) {
			const habitSum = habits.reduce((sum, habit) => {
				if (habit.timeEstimate <= habit.workDuration) return sum;
				return sum + habit.timeEstimate - habit.workDuration;
			}, 0);
			const taskSum = tasks.reduce((sum, task) => {
				if (task.timeEstimate <= task.workDuration) return sum;
				return sum + task.timeEstimate - task.workDuration;
			}, 0);
			return habitSum + taskSum;
		}

		loadHabitsAndTasks();
	}, []);

	const calculateEstimate = useCallback(() => {
		const habitSum = habits.reduce((sum, habit) => {
			if (habit.timeEstimate <= habit.workDuration) return sum;
			return sum + habit.timeEstimate - habit.workDuration;
		}, 0);
		const taskSum = tasks.reduce((sum, task) => {
			if (task.timeEstimate <= task.workDuration) return sum;
			return sum + task.timeEstimate - task.workDuration;
		}, 0);

		setEstimate(habitSum + taskSum);
	}, [tasks, habits]);

	useEffect(() => {
		calculateEstimate();
	}, [tasks, habits, calculateEstimate]);

	const createHabit = async function(habitObj) {
		const newInstance = await habitAPI.createHabit(
			habitObj.habitName,
			habitObj.habitFreq,
			habitObj.habitFreqInfo,
			habitObj.goalType,
			habitObj.target,
		);

		if (newInstance === null) return;
		setHabits((habits) => [newInstance, ...habits]);
	};

	const createTask = async function(taskObj) {
		const task = await habitAPI.createTask(taskObj.taskName, taskObj.date);
		setTasks((tasks) => [task, ...tasks]);
	};

	return (
		<HabitsContext
			value={{
				habits,
				setHabits,
				tasks,
				setTasks,
				createHabit,
				createTask,
				estimate,
				calculateEstimate,
			}}
		>
			{children}
		</HabitsContext>
	);
}
