import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../features/tasks/tasksThunks";
import SaveIcon from "./../../assets/svgs/content-save.svg?react";

function CreateTaskModal({ isOpen, setOpen, setButtonDisplay }) {
	const [taskName, setTaskName] = useState("");
	const [date, setDate] = useState("");
	const dispatch = useDispatch();

	if (!isOpen) return null;

	const handleCreation = async function(event) {
		event.preventDefault();
		dispatch(createTask({ taskName, date }));
		closeModal();
	};

	const closeModal = function() {
		setOpen(false);
		setButtonDisplay(false);
	};

	return (
		<div className="habit-overlay" onClick={closeModal}>
			<div className="main-habit-form" onClick={(e) => e.stopPropagation()}>
				<h3>Create a new Task</h3>
				<form onSubmit={handleCreation}>
					<label>
						<input
							type="text"
							value={taskName}
							onChange={(event) => setTaskName(event.target.value)}
							required
						/>
						<span>Task Name</span>
					</label>
					<label>
						<input
							type="date"
							value={date}
							onChange={(event) => {
								setDate(event.target.value);
							}}
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
