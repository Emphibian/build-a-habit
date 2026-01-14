import { createAsyncThunk } from "@reduxjs/toolkit";
import habitAPI from "../../api/habitAPI";

export const fetchUpcomingTasks = createAsyncThunk(
	"upcomingTasks/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const res = await habitAPI.getUpcomingTasks();
			return res;
		} catch (err) {
			return rejectWithValue(err.message || "Fetch failed");
		}
	},
);
