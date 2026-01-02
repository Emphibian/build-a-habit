import { createSelector } from "@reduxjs/toolkit";

const selectTasks = (state) => state.tasks;
export const selectDueTasks = createSelector([selectTasks], (tasks) => {
	return tasks.allIds
		.map((id) => tasks.byId[id])
		.filter((task) => !task.completed);
});

export const selectTasksRemainingTime = createSelector(
	[selectDueTasks],
	(dueTasks) => {
		return dueTasks.reduce((sum, task) => {
			if (task.timeEstimate <= task.workDuration) return sum;
			return sum + task.timeEstimate - task.workDuration;
		}, 0);
	},
);
