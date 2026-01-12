import { createAsyncThunk } from "@reduxjs/toolkit";
import trackAPI from "../../api/trackAPI";

export const fetchTracks = createAsyncThunk(
	"tracks/fetchTracks",
	async (_, { rejectWithValue }) => {
		try {
			const res = await trackAPI.getTracks();
			return res;
		} catch (err) {
			return rejectWithValue(err.response?.data || err.message);
		}
	},
);

export const deleteTrack = createAsyncThunk(
	"tracks/deleteTrack",
	async (id, { rejectWithValue }) => {
		const res = await trackAPI.deleteTrack(id);
		if (!res.ok) {
			const err = await res.json();
			return rejectWithValue(err.message || "Delete Failed");
		}

		return id;
	},
);
