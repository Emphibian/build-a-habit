import { createAsyncThunk } from "@reduxjs/toolkit";
import habitAPI from "../../api/habitAPI";

export const fetchHabits = createAsyncThunk(
	"habits/fetch",
	async (_, { rejectWithValue }) => {
		console.log("fetch ran");
		try {
			const res = await habitAPI.getHabits();
			console.log(res);
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);

export const createHabit = createAsyncThunk(
	"habits/create",
	async (habitObj, { rejectWithValue }) => {
		console.log("create ran");
		try {
			const newInstance = await habitAPI.createHabit(
				habitObj.habitName,
				habitObj.habitFreq,
				habitObj.habitFreqInfo,
				habitObj.goalType,
				habitObj.target,
			);

			// habit instance should not be generated today
			if (newInstance === null) return;
			return newInstance;
		} catch (err) {
			console.err("error returned createHabit");
			console.err(err);
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);

export const markComplete = createAsyncThunk(
	"habits/markComplete",
	async (habitObj, { rejectWithValue }) => {
		try {
			const { id, value } = habitObj;
			// TODO: Make the api return response to get the pending state
			const res = await habitAPI.markComplete(id, value, true);
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);

// TODO: Make the api return response object promise to get the pending state
export const deleteHabit = createAsyncThunk(
	"habits/delete",
	async (id, { rejectWithValue }) => {
		const res = await habitAPI.deleteInstance(id, true);
		if (!res.ok) {
			const err = await res.json();
			return rejectWithValue(err.message || "Delete Failed");
		}

		// WARN: no error checking here, return response object from the API to check
		return id;
	},
);

// TODO: Make the api return response object promise to get the pending state
export const updateTimeSpent = createAsyncThunk(
	"habits/updateTime",
	async ({ id, timeSpent }, { rejectWithValue }) => {
		try {
			const res = await habitAPI.updateTimeSpent(id, timeSpent, true);
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);

// TODO: Make the api return promise to get the pending state
export const updateEstimate = createAsyncThunk(
	"habits/updateEstimate",
	async ({ id, estimate }, { rejectWithValue }) => {
		console.log(estimate);
		try {
			const res = await habitAPI.updateEstimate(id, estimate, true);
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);
