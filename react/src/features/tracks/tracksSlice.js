import { createSlice } from "@reduxjs/toolkit";
import { fetchTracks, deleteTrack } from "./tracksThunks";

const initialState = { byId: {}, allIds: [], status: "idle", error: null };

const tracksSlice = createSlice({
	name: "tracks",
	initialState,
	extraReducers: (builder) => {
		builder
			// fetch tracks thunk
			.addCase(fetchTracks.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchTracks.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.byId = {};
				state.allIds = [];
				action.payload.forEach((t) => {
					state.byId[t._id] = t;
					state.allIds.push(t._id);
				});
			})
			.addCase(fetchTracks.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload || action.error.message;
			})
			.addCase(deleteTrack.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteTrack.fulfilled, (state, action) => {
				const id = action.payload;
				delete state.byId[id];
				const index = state.allIds.indexOf(id);
				if (index !== -1) state.allIds.splice(index, 1);

				state.status = "succeeded";
				state.error = null;
			})
			.addCase(deleteTrack.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload || action.error.message;
			});
	},
});

export default tracksSlice.reducer;
