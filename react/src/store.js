import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./features/habits/habitsSlice";
import tasksReducer from "./features/tasks/tasksSlice";
import tracksReducer from "./features/tracks/tracksSlice";
import upcomingTasksReducer from "./features/upcomingTasks/upcomingTasksSlice";

const store = configureStore({
	reducer: {
		habits: habitsReducer,
		tasks: tasksReducer,
		tracks: tracksReducer,
		upcomingTasks: upcomingTasksReducer,
	},
});

export default store;
