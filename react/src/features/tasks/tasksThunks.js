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

export const deleteTask = createAsyncThunk(
	"tasks/delete",
	async (id, { rejectWithValue }) => {
		const res = await habitAPI.deleteInstance(id, false);
		if (!res.ok) {
			const err = await res.json();
			return rejectWithValue(err.message || "Delete Failed");
		}

		// WARN: no error checking here, return response object from the API to check
		return id;
	},
);

export const setTaskEstimate = createAsyncThunk(
	"tasks/setEstimate",
	async ({ id, estimate }, { rejectWithValue }) => {
		try {
			const res = await habitAPI.updateEstimate(id, estimate, false);
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);

export const setTaskTime = createAsyncThunk(
	"tasks/setTime",
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

export const taskComplete = createAsyncThunk(
	"tasks/taskComplete",
	async (id, { rejectWithValue }) => {
		try {
			const res = await habitAPI.markComplete(id, 0, false);
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);

export const updateTaskName = createAsyncThunk(
	"tasks/updateName",
	async ({ id, name }, { rejectWithValue }) => {
		try {
			const res = await habitAPI.updateName(id, name, false);
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);
