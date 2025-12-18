import { DeleteButton } from "./DeleteButton.jsx";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateEstimate } from "../../features/habits/habitsThunks";
import { Dial } from "./Dial.jsx";

import StopwatchIcon from "../../assets/svgs/timer.svg?react";
import AlarmSnoozeIcon from "../../assets/svgs/alarm-snooze.svg?react";
import CloseIcon from "../../assets/svgs/close.svg?react";

function UpdateEstimateButton({ id }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [minutes, setMinutes] = useState(0);
	const dispatch = useDispatch();

	const handleUpdate = async function(event) {
		event.preventDefault();
		dispatch(updateEstimate({ id, estimate: minutes }));
		closeModal();
	};

	const openModal = function() {
		setModalOpen(true);
	};

	const closeModal = function() {
		setModalOpen(false);
	};

	const updateMinutes = function(min) {
		setMinutes(min);
	};

	let modal = "";
	if (modalOpen) {
		modal = (
			<div className="habit-overlay" onClick={closeModal}>
				<div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
					<form onSubmit={handleUpdate}>
						<Dial
							initial={minutes}
							onChange={updateMinutes}
							label={"Estimate"}
						/>
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
				Update Estimate
			</button>
		</>
	);
}

function UpdateTimeSpentButton({ id, updateUI, isHabit }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [timeSpent, setTimeSpent] = useState("");

	const handleUpdate = async function(event) {
		event.preventDefault();
		updateUI(id, timeSpent, isHabit);
		closeModal();
	};

	const openModal = function() {
		setModalOpen(true);
	};

	const closeModal = function() {
		setModalOpen(false);
	};

	let modal = "";
	if (modalOpen) {
		modal = (
			<div className="habit-overlay" onClick={closeModal}>
				<div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
					<form onSubmit={handleUpdate}>
						<label>
							<input
								type="text"
								value={timeSpent}
								onChange={(event) => setTimeSpent(event.target.value)}
								required
							/>
							<span>Time Spent</span>
						</label>
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
				<AlarmSnoozeIcon />
				Update Time Spent
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

export function HabitSidebar({
	instance,
	open,
	close,
	handleDelete,
	updateEstimate,
	updateTimeSpent,
}) {
	if (open)
		return (
			<div className="sidebar sidebar-right">
				<ul>
					<li>
						<UpdateEstimateButton
							id={instance.id}
							updateUI={updateEstimate}
							isHabit={instance.isHabit}
						/>
					</li>
					<li>
						<UpdateTimeSpentButton
							id={instance.id}
							updateUI={updateTimeSpent}
							isHabit={instance.isHabit}
						/>
					</li>
					<li>
						<DeleteButton
							id={instance.id}
							updateUI={handleDelete}
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
