import { createSelector } from "@reduxjs/toolkit";

const selectTaskObject = (state) => state.tasks;
export const selectDueTasks = createSelector(
	[selectTaskObject],
	(taskObject) => {
		return taskObject.allIds
			.map((id) => taskObject.byId[id])
			.filter((task) => !task.completed);
	},
);

export const selectCompletedTasks = createSelector(
	[selectTaskObject],
	(taskObject) => {
		return taskObject.allIds
			.map((id) => taskObject.byId[id])
			.filter((task) => task.completed);
	},
);

export const selectTasksRemainingTime = createSelector(
	[selectDueTasks],
	(dueTasks) => {
		return dueTasks.reduce((sum, task) => {
			if (task.timeEstimate <= task.workDuration) return sum;
			return sum + task.timeEstimate - task.workDuration;
		}, 0);
	},
);
