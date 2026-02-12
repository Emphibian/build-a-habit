import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./features/habits/habitsSlice";
import tasksReducer from "./features/tasks/tasksSlice";
import tracksReducer from "./features/tracks/tracksSlice";
import upcomingTasksReducer from "./features/upcomingTasks/upcomingTasksSlice";
import archivedTaskReducer from "./features/archivedTasks/archivedTasksSlice";

const store = configureStore({
	reducer: {
		habits: habitsReducer,
		tasks: tasksReducer,
		tracks: tracksReducer,
		upcomingTasks: upcomingTasksReducer,
		archivedTasks: archivedTaskReducer,
	},
});

export default store;
