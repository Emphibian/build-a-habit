import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpcomingTasks } from "../../../features/upcomingTasks/upcomingTasksThunks";
import { useEffect } from "react";
import { UpcomingTask } from "./UpcomingTask";
import { RescheduleModal } from "./RescheduleModal";

export function UpcomingTasksContainer() {
	const [modalOpen, setModalOpen] = useState(false);
	const [currentTask, setCurrentTask] = useState(null);
	const upcomingTasks = useSelector((state) =>
		state.upcomingTasks.allIds.map((id) => state.upcomingTasks.byId[id]),
	);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUpcomingTasks());
	}, [dispatch]);

	return (
		<div className="entries-container">
			{upcomingTasks.map((task) => {
				return (
					<UpcomingTask
						key={task._id}
						name={task.name}
						id={task._id}
						scheduledOn={task.scheduledOn}
						openModal={() => {
							setModalOpen(true);
							setCurrentTask(task);
						}}
					/>
				);
			})}
			<RescheduleModal
				isOpen={modalOpen}
				setOpen={setModalOpen}
				id={currentTask?._id}
				curDate={currentTask?.scheduledOn}
			/>
		</div>
	);
}
