import { useState, useContext } from "react";
import { HabitsContext } from "../../contexts/HabitContext.jsx";

function CreateTaskModal({ isOpen, setOpen, setButtonDisplay }) {
	const [taskName, setTaskName] = useState("");
	const [date, setDate] = useState("");
	const { createTask } = useContext(HabitsContext);

	if (!isOpen) return null;

	const handleCreation = async function (event) {
		event.preventDefault();
		createTask({ taskName, date });
		closeModal();
	};

	const closeModal = function () {
		setOpen(false);
		setButtonDisplay(false);
	};

	return (
		<div className="habit-overlay" onClick={closeModal}>
			<div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
				<form onSubmit={handleCreation}>
					<label>
						Task Name:
						<input
							type="text"
							value={taskName}
							onChange={(event) => setTaskName(event.target.value)}
							placeholder="Task Name"
							required
						/>
					</label>
					<label>
						Schedule on:
						<input
							type="date"
							value={date}
							onChange={(event) => {
								setDate(event.target.value);
							}}
						/>
					</label>
					<button type="submit">Create</button>
				</form>
			</div>
		</div>
	);
}

export function CreateTaskButton({ setButtonDisplay }) {
	const [modalOpen, setModalOpen] = useState(false);

	function handleClick() {
		setModalOpen(true);
	}

	return (
		<>
			<button className="create-habit spawned" onClick={handleClick}>
				Task
			</button>
			<CreateTaskModal
				isOpen={modalOpen}
				setOpen={setModalOpen}
				setButtonDisplay={setButtonDisplay}
			/>
		</>
	);
}
