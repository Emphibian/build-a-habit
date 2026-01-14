import { createSlice } from "@reduxjs/toolkit";
import { fetchUpcomingTasks } from "./upcomingTasksThunks.js";

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
			});
	},
});

export default upcomingSlice.reducer;
