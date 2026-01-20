import { useState } from "react";
import { useDispatch } from "react-redux";
import { rescheduleUpcomingTasks } from "../../../features/upcomingTasks/upcomingTasksThunks";
import { rescheduleTask } from "../../../features/tasks/tasksThunks";
import SaveIcon from "../../../assets/svgs/content-save.svg?react";

export function RescheduleModal({ isOpen, setOpen, id, curDate }) {
	const [date, setDate] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const currentDate = new Date(curDate);
		currentDate.setHours(0, 0, 0, 0);
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		if (currentDate.getTime() == today.getTime()) {
			dispatch(rescheduleTask({ id, date }));
		} else {
			dispatch(rescheduleUpcomingTasks({ id, date }));
		}
		closeModal();
	};

	if (!isOpen) return null;

	const closeModal = () => {
		setOpen(false);
	};

	return (
		<div className="habit-overlay" onClick={closeModal}>
			<div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
				<h3>Reschedule</h3>
				<form onSubmit={handleSubmit}>
					<label>
						<input
							type="date"
							value={date}
							onChange={(event) => setDate(event.target.value)}
							required
						/>
						<span>Schedule on:</span>
					</label>
					<div className="btn-grp">
						<button type="submit">
							<SaveIcon fill="#04a9f5" />
							Save
						</button>
						<button onClick={closeModal}>Cancel</button>
					</div>
				</form>
			</div>
		</div>
	);
}
