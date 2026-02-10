import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpcomingTasks } from "../../../features/upcomingTasks/upcomingTasksThunks";
import { useEffect } from "react";
import { UpcomingTask } from "./UpcomingTask";
import { RescheduleModal } from "./RescheduleModal";
import { OperationModal } from "../OperationModal";

export function UpcomingTasksContainer() {
	const [modalOpen, setModalOpen] = useState(false);
	const [currentTask, setCurrentTask] = useState(null);
	const [operationModalOpen, setOperationModalOpen] = useState(false);
	const [operationModalPos, setOperationModalPos] = useState(null);

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
						openOperationModal={(position) => {
							setCurrentTask({ id: task._id, isHabit: false });
							setOperationModalPos(position);
							setOperationModalOpen(true);
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
			<OperationModal
				instance={currentTask}
				open={operationModalOpen}
				position={operationModalPos}
				close={() => setOperationModalOpen(false)}
			/>
		</div>
	);
}
