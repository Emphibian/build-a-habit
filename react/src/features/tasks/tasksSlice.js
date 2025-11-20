import { createSlice } from "@reduxjs/toolkit";
import {
	fetchTasks,
	createTask,
	deleteTask,
	updateTimeSpent,
} from "./tasksThunks";

const initialState = { byId: {}, allIds: [], status: "idle", error: null };

const genericPendingReducer = (state) => {
	state.status = "loading";
	state.error = null;
};

const genericRejectReducer = (state, action) => {
	state.status = "failed";
	state.error = action.payload || action.error.message;
};

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, genericPendingReducer)
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.byId = {};
				state.allIds = [];
				action.payload.forEach((t) => {
					state.byId[t._id] = t;
					state.allIds.push(t._id);
				});
			})
			.addCase(fetchTasks.rejected, genericRejectReducer)
			.addCase(createTask.pending, genericRejectReducer)
			.addCase(createTask.fulfilled, (state, action) => {
				state.status = "succeeded";
				const item = action.payload;
				state.byId[item._id] = item;
				state.allIds.push(item._id);
			})
			.addCase(createTask.rejected, genericRejectReducer)
			.addCase(deleteTask.pending, genericPendingReducer)
			.addCase(deleteTask.fulfilled, (state, action) => {
				const id = action.payload;
				delete state.byId[id];
				const index = state.allIds.indexOf(id);
				if (index !== -1) state.allIds.splice(index, 1);

				state.status = "succeeded";
				state.error = null;
			})
			.addCase(deleteTask.rejected, genericRejectReducer);
	},
});

export default tasksSlice.reducer;
