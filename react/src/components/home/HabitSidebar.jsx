import { DeleteButton } from "./DeleteButton.jsx";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	updateEstimate,
	updateTimeSpent,
} from "../../features/habits/habitsThunks";
import { setTaskEstimate, setTaskTime } from "../../features/tasks/tasksThunks";
import { Dial } from "./Dial.jsx";

import StopwatchIcon from "../../assets/svgs/timer.svg?react";
import CloseIcon from "../../assets/svgs/close.svg?react";

function UpdateEstimateButton({ id, isHabit }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [estimate, setEstimate] = useState(0);
	const [timeSpent, setTimeSpent] = useState(0);
	const dispatch = useDispatch();

	const initialEstimate = useSelector((state) =>
		isHabit
			? state.habits.byId[id].timeEstimate
			: state.tasks.byId[id].timeEstimate,
	);

	const initialTimeSpent = useSelector((state) =>
		isHabit
			? state.habits.byId[id].workDuration
			: state.tasks.byId[id].workDuration,
	);

	useEffect(() => {
		setEstimate(initialEstimate);
		setTimeSpent(initialTimeSpent);
	}, []);

	const handleUpdate = async function (event) {
		event.preventDefault();
		if (isHabit) {
			if (initialEstimate != estimate) {
				await dispatch(updateEstimate({ id, estimate }));
			}
			if (initialTimeSpent != timeSpent) {
				await dispatch(updateTimeSpent({ id, timeSpent }));
			}
		} else {
			if (initialEstimate != estimate)
				await dispatch(setTaskEstimate({ id, estimate }));
			if (initialTimeSpent != timeSpent)
				await dispatch(setTaskTime({ id, timeSpent }));
		}

		closeModal();
	};

	const openModal = function () {
		setModalOpen(true);
	};

	const closeModal = function () {
		setModalOpen(false);
	};

	let modal = "";
	if (modalOpen) {
		modal = (
			<div className="habit-overlay" onClick={closeModal}>
				<div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
					<h3>Duration</h3>
					<form onSubmit={handleUpdate}>
						<div className="justify-center gap-15">
							<Dial
								initial={initialEstimate}
								onChange={setEstimate}
								label={"Estimate"}
							/>
							<Dial
								initial={initialTimeSpent}
								onChange={setTimeSpent}
								label={"Time Spent"}
							/>
						</div>
						<div className="btn-grp">
							<button type="submit">Update</button>
							<button onClick={closeModal}>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		);
	}

	return (
		<>
			{modal}
			<button onClick={openModal}>
				<StopwatchIcon />
				Time
			</button>
		</>
	);
}

function CloseButton({ close }) {
	return (
		<button onClick={close}>
			<CloseIcon />
			Close
		</button>
	);
}

export function HabitSidebar({ instance, open, close }) {
	if (open)
		return (
			<div className="sidebar sidebar-right">
				<ul>
					<li>
						<UpdateEstimateButton id={instance.id} isHabit={instance.isHabit} />
					</li>
					<li>
						<DeleteButton
							id={instance.id}
							isHabit={instance.isHabit}
							closeSidebar={close}
						/>
					</li>
					<li>
						<CloseButton close={close} />
					</li>
				</ul>
			</div>
		);

	return;
}
