import { createSlice } from "@reduxjs/toolkit";
import { fetchArchivedTasks } from "./archivedTasksThunks.js";

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

const archivedSlice = createSlice({
	name: "archivedTasks",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArchivedTasks.rejected, genericRejectReducer)
			.addCase(fetchArchivedTasks.pending, genericPendingReducer)
			.addCase(fetchArchivedTasks.fulfilled, (state, action) => {
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

export default archivedSlice.reducer;
