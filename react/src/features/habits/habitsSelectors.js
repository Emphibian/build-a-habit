import { createSelector } from "@reduxjs/toolkit";

const selectHabitsObject = (state) => state.habits;
export const selectDueHabits = createSelector(
	[selectHabitsObject],
	(habitObject) => {
		return habitObject.allIds
			.map((id) => habitObject.byId[id])
			.filter((habit) => habit.status !== "Completed");
	},
);

export const selectCompletedHabits = createSelector(
	[selectHabitsObject],
	(habitObject) => {
		return habitObject.allIds
			.map((id) => habitObject.byId[id])
			.filter((habit) => habit.status === "Completed");
	},
);

export const selectHabitsRemainingTime = createSelector(
	[selectDueHabits],
	(dueHabits) => {
		return dueHabits.reduce((sum, habit) => {
			if (habit.timeEstimate <= habit.workDuration) return sum;
			return sum + habit.timeEstimate - habit.workDuration;
		}, 0);
	},
);
