import { createSlice } from "@reduxjs/toolkit";
import {
	fetchUpcomingTasks,
	rescheduleUpcomingTasks,
} from "./upcomingTasksThunks.js";

const initialState = {
	byId: {},
	allIds: [],
	status: "idle",
	error: null,
};

const genericPendingReducer = (state) => {
	state.status = "loading";
	state.error = null;
};

const genericRejectReducer = (state, action) => {
	state.status = "failed";
	state.error = action?.payload || action?.error?.message;
};

const upcomingSlice = createSlice({
	name: "upcomingTasks",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUpcomingTasks.pending, genericPendingReducer)
			.addCase(fetchUpcomingTasks.rejected, genericRejectReducer)
			.addCase(fetchUpcomingTasks.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.byId = {};
				state.allIds = [];
				action.payload.forEach((t) => {
					state.byId[t._id] = t;
					state.allIds.push(t._id);
				});
			})
			.addCase(rescheduleUpcomingTasks.pending, genericPendingReducer)
			.addCase(rescheduleUpcomingTasks.rejected, genericRejectReducer)
			.addCase(rescheduleUpcomingTasks.fulfilled, (state, action) => {
				state.status = "succeeded'";
				const task = action.payload;
				const currentDay = new Date();
				currentDay.setHours(0, 0, 0, 0);
				const taskDate = new Date(task.scheduledOn);

				if (taskDate.getTime() <= currentDay.getTime()) {
					delete state.byId[task._id];
					const index = state.allIds.indexOf(task._id);
					state.allIds.splice(index, 1);
				} else {
					state.byId[task._id] = task;
				}
			});
	},
});

export default upcomingSlice.reducer;
