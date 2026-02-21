import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RippleButton } from "./general/RippleButton.jsx";

import {
	updateEstimate,
	updateTimeSpent,
} from "../../features/habits/habitsThunks";
import { setTaskEstimate, setTaskTime } from "../../features/tasks/tasksThunks";

import { Dial } from "./Dial.jsx";
import StopwatchIcon from "../../assets/svgs/timer.svg?react";
import { createPortal } from "react-dom";

export function UpdateEstimateButton({ id, isHabit }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [estimate, setEstimate] = useState(0);
	const [timeSpent, setTimeSpent] = useState(0);
	const dispatch = useDispatch();

	const initialEstimate = useSelector((state) =>
		isHabit
			? state.habits.byId[id]?.timeEstimate
			: state.tasks.byId[id]?.timeEstimate,
	);

	const initialTimeSpent = useSelector((state) =>
		isHabit
			? state.habits.byId[id]?.workDuration
			: state.tasks.byId[id]?.workDuration,
	);

	useEffect(() => {
		setEstimate(initialEstimate);
		setTimeSpent(initialTimeSpent);
	}, []);

	const handleUpdate = function (event) {
		event.preventDefault();
		if (isHabit) {
			if (initialEstimate != estimate) {
				dispatch(updateEstimate({ id, estimate }));
			}
			if (initialTimeSpent != timeSpent) {
				dispatch(updateTimeSpent({ id, timeSpent }));
			}
		} else {
			if (initialEstimate != estimate)
				dispatch(setTaskEstimate({ id, estimate }));
			if (initialTimeSpent != timeSpent)
				dispatch(setTaskTime({ id, timeSpent }));
		}

		closeModal();
	};

	const openModal = function () {
		const RIPPLE_EFFECT_LENGTH = 150;
		setTimeout(() => setModalOpen(true), RIPPLE_EFFECT_LENGTH);
	};

	const closeModal = function () {
		setModalOpen(false);
	};

	let modal = "";
	if (modalOpen) {
		const modalDiv = (
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

		modal = createPortal(modalDiv, document.getElementById("modal-root"));
	}

	return (
		<>
			{modal}
			<button onClick={openModal}>
				<StopwatchIcon />
				<span>Time Tracking</span>
			</button>
		</>
	);
}
