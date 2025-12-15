import { createSlice } from "@reduxjs/toolkit";
import {
	fetchHabits,
	createHabit,
	markComplete,
	deleteHabit,
	updateTimeSpent,
	updateEstimate,
} from "./habitsThunks";

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
	state.loading = false;
	state.error = action.payload ?? action.error?.message ?? "Unknown error";
};

const habitsSlice = createSlice({
	name: "habits",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchHabits.pending, genericPendingReducer)
			.addCase(fetchHabits.rejected, genericRejectReducer)
			.addCase(fetchHabits.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.byId = {};
				state.allIds = [];
				action.payload.forEach((t) => {
					state.byId[t._id] = t;
					state.allIds.push(t._id);
				});
			})
			.addCase(createHabit.pending, genericRejectReducer)
			.addCase(createHabit.rejected, genericRejectReducer)
			.addCase(createHabit.fulfilled, (state, action) => {
				state.status = "succeeded";
				const instance = action.payload;
				state.byId[instance._id] = instance;
				state.allIds.push(instance._id);
			})
			.addCase(markComplete.pending, genericPendingReducer)
			.addCase(markComplete.rejected, genericRejectReducer)
			.addCase(markComplete.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.error = null;
				const instance = action.payload;
				console.log(instance.status);
				state.byId[instance._id] = instance;
			})
			.addCase(deleteHabit.pending, genericPendingReducer)
			.addCase(deleteHabit.rejected, genericRejectReducer)
			.addCase(deleteHabit.fulfilled, (state, action) => {
				const id = action.payload;

				state.allIds = state.allIds.filter((existingId) => existingId !== id);
				const { [id]: deletedHabit, ...newById } = state.byId;
				state.byId = newById;

				state.status = "succeeded";
				state.error = null;
			})
			.addCase(updateTimeSpent.pending, genericPendingReducer)
			.addCase(updateTimeSpent.rejected, genericRejectReducer)
			.addCase(updateTimeSpent.fulfilled, (state, action) => {
				const instance = action.payload;
				state.byId[instance._id] = instance;
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(updateEstimate.pending, genericPendingReducer)
			.addCase(updateEstimate.rejected, genericRejectReducer)
			.addCase(updateEstimate.fulfilled, (state, action) => {
				const instance = action.payload;
				state.byId[instance._id] = instance;
				state.status = "succeeded";
				state.error = null;
			});
	},
});

export default habitsSlice.reducer;
