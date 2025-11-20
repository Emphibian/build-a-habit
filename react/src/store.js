import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./features/habits/habitsSlice";
import tasksReducer from "./features/tasks/tasksSlice";
import tracksReducer from "./features/tracks/tracksSlice";

const store = configureStore({
	reducer: {
		habits: habitsReducer,
		tasks: tasksReducer,
		tracks: tracksReducer,
	},
});

export default store;
