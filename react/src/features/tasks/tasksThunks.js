import { createAsyncThunk } from "@reduxjs/toolkit";
import habitAPI from "../../api/habitAPI";

export const fetchTasks = createAsyncThunk(
	"tasks/fetch",
	async (_, { rejectWithValue }) => {
		try {
			const res = await habitAPI.getTasks();
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);

export const createTask = createAsyncThunk(
	"tasks/create",
	async (taskObj, { rejectWithValue }) => {
		try {
			const res = await habitAPI.createTask(taskObj.taskName, taskObj.date);
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);

export const deleteHabit = createAsyncThunk(
	"tasks/delete",
	async (id, { rejectWithValue }) => {
		try {
			// TODO: Make the api return promise to get the pending state
			const res = await habitAPI.deleteInstance(id, false);
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);

export const updateTimeSpent = createAsyncThunk(
	"tasks/updateTime",
	async ({ id, timeSpent }, { rejectWithValue }) => {
		try {
			// TODO: Make the api return promise to get the pending state
			const res = await habitAPI.updateTimeSpent(id, timeSpent, false);
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);
