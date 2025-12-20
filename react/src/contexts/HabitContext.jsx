import { createContext, useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

export const HabitsContext = createContext();

export function HabitsProvider({ children }) {
	const [estimate, setEstimate] = useState(0);

	const dueTasks = useSelector((state) =>
		state.tasks.allIds.map((id) => state.tasks.byId[id]),
	).filter((task) => !task.completed);

	const dueHabits = useSelector((state) =>
		state.habits.allIds.map((id) => state.habits.byId[id]),
	).filter((habit) => habit.status !== "Completed");

	useEffect(() => {
		function calculateEstimate() {
			const habitSum = dueHabits.reduce((sum, habit) => {
				if (habit.timeEstimate <= habit.workDuration) return sum;
				return sum + habit.timeEstimate - habit.workDuration;
			}, 0);
			const taskSum = dueTasks.reduce((sum, task) => {
				if (task.timeEstimate <= task.workDuration) return sum;
				return sum + task.timeEstimate - task.workDuration;
			}, 0);
			return habitSum + taskSum;
		}

		setEstimate(calculateEstimate());
	}, []);

	const calculateEstimate = useCallback(() => {
		const habitSum = dueHabits.reduce((sum, habit) => {
			if (habit.timeEstimate <= habit.workDuration) return sum;
			return sum + habit.timeEstimate - habit.workDuration;
		}, 0);
		const taskSum = dueTasks.reduce((sum, task) => {
			if (task.timeEstimate <= task.workDuration) return sum;
			return sum + task.timeEstimate - task.workDuration;
		}, 0);

		if (estimate !== habitSum + taskSum) {
			setEstimate(habitSum + taskSum);
		}
	}, [dueHabits, dueTasks, estimate]);

	useEffect(() => {
		calculateEstimate();
	}, [dueTasks, dueHabits]);

	return (
		<HabitsContext
			value={{
				estimate,
			}}
		>
			{children}
		</HabitsContext>
	);
}
