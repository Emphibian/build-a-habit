import { createSelector } from "@reduxjs/toolkit";

const selectHabits = (state) => state.habits;
export const selectDueHabits = createSelector([selectHabits], (habits) => {
	return habits.allIds
		.map((id) => habits.byId[id])
		.filter((habit) => habit.status !== "Completed");
});

export const selectHabitsRemainingTime = createSelector(
	[selectDueHabits],
	(dueHabits) => {
		return dueHabits.reduce((sum, habit) => {
			if (habit.timeEstimate <= habit.workDuration) return sum;
			return sum + habit.timeEstimate - habit.workDuration;
		}, 0);
	},
);
