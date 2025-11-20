import { createContext, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import habitAPI from "../api/habitAPI.js";

export const HabitsContext = createContext();

export function HabitsProvider({ children }) {
	const [habits, setHabits] = useState([]);
	const [tasks, setTasks] = useState([]);
	const allHabits = useSelector((state) =>
		state.habits.allIds.map((id) => state.habits.byId[id]),
	);
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
		const habitSum = allHabits.reduce((sum, habit) => {
			if (habit.timeEstimate <= habit.workDuration) return sum;
			return sum + habit.timeEstimate - habit.workDuration;
		}, 0);
		const taskSum = tasks.reduce((sum, task) => {
			if (task.timeEstimate <= task.workDuration) return sum;
			return sum + task.timeEstimate - task.workDuration;
		}, 0);

		if (estimate !== habitSum + taskSum) {
			setEstimate(habitSum + taskSum);
		}
	}, [tasks, allHabits]);

	useEffect(() => {
		calculateEstimate();
	}, [tasks, allHabits]);

	const createHabit = async function (habitObj) {
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

	const createTask = async function (taskObj) {
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
