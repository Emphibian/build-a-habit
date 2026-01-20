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

export const rescheduleUpcomingTasks = createAsyncThunk(
	"upcomingTasks/reschedule",
	async ({ id, date }, { rejectWithValue }) => {
		try {
			const res = await habitAPI.rescheduleTask(id, date);
			return res;
		} catch (err) {
			return rejectWithValue(err.message || "Couldn't reschedule");
		}
	},
);
