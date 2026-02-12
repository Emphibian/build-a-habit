import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DateContainer } from "./DateContainer.jsx";
import { fetchArchivedTasks } from "../.././../features/archivedTasks/archivedTasksThunks.js";

export const ArchivedTaskContainer = () => {
	// OPTIMIZE: memoize this selector
	const tasks = useSelector((state) => {
		return state.archivedTasks.allIds.map((id) => state.archivedTasks.byId[id]);
	});

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchArchivedTasks());
	}, [dispatch]);

	const dateMap = new Map();
	const dates = [];
	tasks.forEach((task) => {
		if (dateMap.has(task.completedOn)) {
			dateMap.get(task.completedOn).push(task);
		} else {
			const array = [];
			array.push(task);
			dateMap.set(task.completedOn, array);
			dates.push(task.completedOn);
		}
	});

	return (
		<>
			{dates.map((date) => {
				const tasksOnDate = dateMap.get(date);

				return <DateContainer tasks={tasksOnDate} date={date} />;
			})}
		</>
	);
};
