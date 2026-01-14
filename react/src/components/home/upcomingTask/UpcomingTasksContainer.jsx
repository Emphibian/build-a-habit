import { useSelector, useDispatch } from "react-redux";
import { fetchUpcomingTasks } from "../../../features/upcomingTasks/upcomingTasksThunks";
import { useEffect } from "react";
import { UpcomingTask } from "./UpcomingTask";

export function UpcomingTasksContainer() {
	const upcomingTasks = useSelector((state) =>
		state.upcomingTasks.allIds.map((id) => state.upcomingTasks.byId[id]),
	);

	const dispatch = useDispatch();
	console.log(upcomingTasks);

	useEffect(() => {
		dispatch(fetchUpcomingTasks());
	}, [dispatch]);

	return (
		<div className="entries-container">
			{upcomingTasks.map((task) => {
				return <UpcomingTask name={task.name} />;
			})}
		</div>
	);
}
