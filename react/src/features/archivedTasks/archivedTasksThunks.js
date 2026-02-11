import { createAsyncThunk } from "@reduxjs/toolkit";
import habitAPI from "../../api/habitAPI";

export const fetchArchivedTasks = createAsyncThunk(
	"archivedTasks/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const res = await habitAPI.getCompletedTasks();
			return res;
		} catch (err) {
			return rejectWithValue(err.message || "Fetch failed");
		}
	},
);
