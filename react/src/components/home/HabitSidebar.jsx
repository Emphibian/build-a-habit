import { DeleteButton } from "./DeleteButton.jsx";
import { useState } from "react";

function UpdateEstimateButton({ id, updateUI, isHabit }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [newEstimate, setNewEstimate] = useState("");

	const handleUpdate = async function (event) {
		event.preventDefault();
		updateUI(id, newEstimate, isHabit);
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
					<form onSubmit={handleUpdate}>
						<label>
							<input
								type="text"
								value={newEstimate}
								onChange={(event) => setNewEstimate(event.target.value)}
								required
							/>
							<span>Estimate</span>
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
			<button onClick={openModal}>Update Estimate</button>
		</>
	);
}

function UpdateTimeSpentButton({ id, updateUI, isHabit }) {
	const [modalOpen, setModalOpen] = useState(false);
	const [timeSpent, setTimeSpent] = useState("");

	const handleUpdate = async function (event) {
		event.preventDefault();
		updateUI(id, timeSpent, isHabit);
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
			<button onClick={openModal}>Update Time Spent</button>
		</>
	);
}

function CloseButton({ close }) {
	return <button onClick={close}>Close</button>;
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
